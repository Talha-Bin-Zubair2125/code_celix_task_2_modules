const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());
// Runs the configuration function reads the .env file parses all key-value pairs and adds them in process.env.
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connection is Eastablished!"))
  .catch((error) => console.error(error, "Error Connecting With DB"));

// Importing Route
const auth = require("./routes/auth");
app.use('/auth',auth);

  // Default Route
app.get('/',(req, res) => {
  res.send("Hey! Welcome to User Panel");
});



app.listen(process.env.port, () => {
    console.log(`Server is Running on Port ${process.env.port}`); 
});
