const mongoose = require("mongoose");

const feedbackschema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, },
  feedback: { type: String, required: true },
});

module.exports = mongoose.model("feedback",feedbackschema);
