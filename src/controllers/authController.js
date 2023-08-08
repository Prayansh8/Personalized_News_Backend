const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../models");

exports.register = async (req, res) => {
  // Implementation of user registration
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new db.User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const userData = {
      user,
    };

    const token = jwt.sign(userData, process.env.JWT_SECRET, {
      expiresIn: "4d",
    });

    return res
      .status(200)
      .json({ message: "Login successful", token, userData });
  } catch (error) {
    return res.status(500).json({ error: "Error logging in", error });
  }
};
