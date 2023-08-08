const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");
const cors = require("cors"); // Import the cors package
dotenv.config();
const bodyParser = require("body-parser"); // Import body-parser
const { connect } = require("./models");

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
connect();
// Add CORS middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from the Node.js backend!");
});

app.use("/auth", authRoutes);
app.use("/articles", articleRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
