require('dotenv').config();
const axios = require('axios');
const db = require('../models');
const NYT_ID = process.env.NYT_ID;
const moment = require('moment');

module.exports = {
  articleSearch: (req, res) => {
    //Backend validation
    if (req.body.startYear === '') {
      req.body.startYear = '0001';
    }
    if (req.body.endYear === '') {
      req.body.endYear = moment().format('YYYY');
    }
    axios
      .get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${NYT_ID}`, {
        params: {
          q: req.body.searchTerm,
          begin_date: req.body.startYear + '0101',
          end_date: req.body.endYear + moment().format('MMDD')
        }
      })
      .then(result => {
        const articleData = result.data.response.docs.map(({ _id, headline, web_url }) => {
          //_id, headline.main, pub_date, web_url
          return {
            _id,
            headline,
            web_url
          };
        });
        res.send(articleData);
      })
      .catch(error => res.send(error));
  },
  saveArticle: (req, res) => {
    db.Article.create(req.body);
  },
  getArticles: (req, res) => {
    // db.articles.find({})
    //equivalent to the line below, this doesn't require a model
    db.Article.find({})
      .sort({ date: -1 })
      .then(savedArticles => res.json(savedArticles))
      .catch(err => res.status(422).json(err));
  },
  remove: (req, res) => {
    db.Article.findById(req.params.id)
      .then(result => result.remove())
      .then(result => res.json(result));
  }
};
