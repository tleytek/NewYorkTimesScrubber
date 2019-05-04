require('dotenv').config();
const nytQuery = require('express').Router();
const axios = require('axios');
const NYT_ID = process.env.NYT_ID;

nytQuery.post('/searchArticles', async (req, res) => {
  axios
    .get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${NYT_ID}`, {
      params: {
        q: req.body.searchTerm
      }
    })
    .then(result => res.send(result.data.response.docs))
    .catch(error => res.send(error));
});

module.exports = nytQuery;
