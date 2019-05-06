const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const articleSchema = new Schema({
  title: { type: String, required: true, trim: true },
  date: { type: String, required: true, trim: true },
  url: { type: String, required: true, trim: true }
});

const Article = new Model('Article', articleSchema);

module.exports = Article;
