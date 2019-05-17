const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const routes = require('./routes');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const db = require('./models');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Add routes, no views, API only because we are a Single Page Appliction
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nytreact', { useNewUrlParser: true });

//get an express.js server running
const server = http.createServer(app);

//hook up our server to socket.io
const io = socketIo(server);

io.on('connection', socket => {
  console.log('New client connected ' + socket.id);
  socket.on('getAllArticlesReq', () => {
    db.Article.find({})
      .sort({ date: -1 })
      .then(savedArticles => io.emit('getAllArticlesRes', savedArticles))
      .catch(err => res.status(422).json(err));
  });
  socket.on('saveArticleReq', article => {
    db.Article.create(article);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`));
