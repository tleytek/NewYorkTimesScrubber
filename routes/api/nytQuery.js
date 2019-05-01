require('dotenv').config();
const nytQuery = require('express').Router();
const axios = require('axios');
const NYT_ID = process.env.NYT_ID;

nytQuery.get('/getArticles', (req, res) => {
  axios
    .get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=venezuela&sort=newest&api-key=${NYT_ID}`)
    .then(result => {
      res.send(result.data.response.docs);
      // console.log(result.data.response);
    })
    .catch(error => {
      res.send(error);
    });
});

module.exports = nytQuery;
