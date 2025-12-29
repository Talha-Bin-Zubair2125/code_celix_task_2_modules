const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());
// Runs the configuration function reads the .env file parses all key-value pairs and adds them in process.env.
dotenv.config();

// Importing db.js connection file
const connectDB = require("./db");
connectDB();

// Importing Route
const auth = require("./routes/auth");
app.use("/auth", auth);
const complaint_route = require("./routes/Complaint_Route");
app.use("/complaint", complaint_route);
const feeback_route = require("./routes/feedback_route");
app.use("/feedback",feeback_route);

// Default Route
app.get("/", (req, res) => {
  res.send("Hey! Welcome to User Panel");
});

app.listen(process.env.port, () => {
  console.log(`Server is Running on Port ${process.env.port}`);
});
