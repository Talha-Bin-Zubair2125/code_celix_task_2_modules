const express = require("express");
const feedbacks = require("../model/feedback");
const router = express.Router();

// Route for Submitting Feedback (/submitfeeback)
router.post("/submitfeedback", async (req, res) => {
  const { name, email, feedback } = req.body;

  try {
    const feeback = new feedbacks({
      name,
      email,
      feedback,
    });
    await feeback.save();

    res.status(201).json({ message: "Complaint Submitted Successfully" });
  } catch (err) {
    console.error("Error Submitting Complaint", err);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
