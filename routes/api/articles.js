const router = require('express').Router();
const articlesController = require('../../controller/articlesController');

router.route('/').post(articlesController.saveArticle);

module.exports = router;
