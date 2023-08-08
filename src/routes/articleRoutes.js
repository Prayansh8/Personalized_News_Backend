const express = require("express");
const articleController = require("../controllers/articleController");
const router = express.Router();
const { isAuthenticatedUser } = require("../utils/jwtUtils");

router.post(
  "/save-article",
  isAuthenticatedUser,
  articleController.saveArticle
);
router.get(
  "/saved-articles",
  isAuthenticatedUser,
  articleController.getSavedArticles
);

module.exports = router;
