const router = require('express').Router();
const articleRoutes = require('./articles');
const newYorkTimes = require('./newYorkTimes');

// router.use('/articles', articleRoutes);
router.use('/searchArticles', newYorkTimes);

module.exports = router;
