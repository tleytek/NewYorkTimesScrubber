const router = require('express').Router();
const articlesController = require('../../controller/articlesController');

router
  .route('/')
  .post(articlesController.saveArticle)
  .get(articlesController.getArticles);

router.route('/:id').delete(articlesController.remove);

module.exports = router;
