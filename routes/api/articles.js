const router = require('express').Router();
const articlesController = require('../../controller/articlesController');

router.route('/').post(articlesController.articleSearch);

module.exports = router;
