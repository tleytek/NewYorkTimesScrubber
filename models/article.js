const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const articleSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true, trim: true },
  url: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now }
});

const Article = new Model('Article', articleSchema);

module.exports = Article;
