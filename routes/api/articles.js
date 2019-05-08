const router = require('express').Router();
const articlesController = require('../../controller/articlesController');

router
  .route('/')
  .post(articlesController.saveArticle)
  .get(articlesController.getArticles);

module.exports = router;
