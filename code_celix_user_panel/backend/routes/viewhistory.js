const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Models
const Complaints = require("../model/complaint");
const Feedbacks = require("../model/feedback");
const User = require("../model/user");

router.get('/history', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // remove 'Bearer'
    // Verify the token that we signed via user id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Finds the user via id
    const user = await User.findById(decoded.id);

    // Fetches the full name of the user 
    const name = user.fullname;
    console.log(name);
    
    const complaints = await Complaints.find({ name });
    const feedbacks = await Feedbacks.find({ name });

    res.status(200).json({ complaints, feedbacks });

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid Token" });
  }
});

module.exports = router;
