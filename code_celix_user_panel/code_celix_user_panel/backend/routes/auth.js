const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const router = express.Router();

// Register
router.post("/registeruser", async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const hashedpassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    /*
      Issue i am using same email address and when i try to login with different password it displays the error beacuse of same email address because can't find the relavent things it is fetching the same email address that is stored in db (and when logging in db gets confused which one is correct)
    */
    const existingUser = await User.findOne({ email });
    // Check if email already exists or not
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({ fullname, email, password: hashedpassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/login_user", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Finding a User By Email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    // Match the Password Entered By User with the Password that is stored in db
    const matchpassword = await bcrypt.compare(password, user.password);
    console.log(matchpassword);
    if (!matchpassword) {
      return res.status(400).json({ message: "Password Incorrect" });
    }

    // Generate JWT token -- signed with the user id along with the secret to verify the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Route for Profile Access only for authorized user
router.get("/profile", async (req, res) => {
  // Reads the JWT token sent by the frontend in the Authorization header.
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    // jwt.verify() checks if the token is valid and signed with your secret.
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    /*
        Find the user by ID from the token payload.
        .select('-password') → exclude the password field from the response.
    */
    const user = await User.findById(verified.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
});

module.exports = router;
