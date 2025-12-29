const mongoose = require("mongoose");

/* why i used enum -- Reason beacuse in frontend i have an empty string so empty string is sent until user selects and backend will accept any type of data like "abc","" this make the database data dirty and if i use enum (Enumeration) this means -- It means “this field can have ONLY these predefined values” and it Protects your database from inconsistent data
 */
const complaintschema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  complaint: { type: String, required: true },
  category: {
    type: String,
    enum: ["Service", "Technical", "Staff", "Delivery"],
    required: true,
  },
  Priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
});

module.exports = mongoose.model("Complaint", complaintschema);
