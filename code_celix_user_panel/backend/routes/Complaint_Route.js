const express = require("express");
const Complaints = require("../model/complaint");
const router = express.Router();

// Complaint Route (/submitcomplaint)
router.post("/submitcomplaint", async (req, res) => {
  const { name, email, complaint, category, Priority } = req.body;

  try {
    const complaints = new Complaints({
      name,
      email,
      complaint,
      category,
      Priority,
    });
    const existingUser = await Complaints.findOne({ email });
    // Check if email already exists or not
    if (existingUser) {
      return res.status(400).json({ message: "Email Already Exists" });
    }
    await complaints.save();
    res.status(201).json({ message: "Complaint Submitted Successfully" });
  } catch (err) {
    console.error("Error Submitting Complaint", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
