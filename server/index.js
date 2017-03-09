var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var userController = require('../controllers/users')
var messagesController = require('../controllers/messages')
var searchesController = require('../controllers/search')

mongoose.connect('mongodb://localhost/doghouse')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  next();
});

app.post('/api/user', userController.create)

app.post('/api/messages', messagesController.create)

app.get('/api/messages', messagesController.recieve)

app.post('/api/search', searchesController.create)


app.listen(3001)