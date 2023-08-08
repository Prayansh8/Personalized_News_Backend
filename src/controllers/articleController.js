const axios = require("axios");
const jwt = require("jsonwebtoken");
const { db } = require("../models");

exports.saveArticle = async (req, res) => {
  try {
    const { articleId } = req.body;

    const user = await db.User.findById(req.user.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.savedArticles.push({ ArticleId: articleId });
    await user.save();

    return res.status(200).json({ message: "Article saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getSavedArticles = async (req, res) => {
  try {
    const userId = req.user.user._id;

    const user = await db.User.findById(userId).populate("savedArticles");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Saved articles retrieved successfully",
      savedArticles: user.savedArticles,
    });
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

exports.getRecommendedArticles = async (req, res) => {
  try {
    const recommendedArticles = await db.Article.find().limit(5); // Adjust limit as needed
    res.json(recommendedArticles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recommended articles" });
  }
};
