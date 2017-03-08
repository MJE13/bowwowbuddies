var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../models/users') //importing users
var Message = require('../models/messages')
var app = express();

mongoose.connect('mongodb://localhost/doghouse')

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  next();
});

app.put('/api/user', function(req,res){
	console.log('body', req.body);
	var user = new User ({
		username: req.body.username,
		password: req.body.password
	})
	user.save(function(err, result){
		if (err) {
			res.status(500)
			res.json(err)
		} else {
			res.send(result);
		}
	})
})

app.post('/api/messages', function(req,res){
	console.log('body', req.body);
	var message = new Message ({
		from: req.body.from,
		to: req.body.to,
		text: req.body.text
	})
	message.save(function(err, result){
		if (err) {
			res.status(500)
			res.json(err)
		} else {
			res.send(result);
		}
	})
})
app.get('/api/messages', function(req, res){
	var user1 = req.query.user1
	var user2 = req.query.user2
	console.log(user1, user2)
	var u1toU2 = {
		from: user1,
		to: user2
	}
	var u2toU1 = {
		from: user2,
		to: user1
	}
	Message.find({
		$or : [u1toU2, u2toU1]
	})
	.sort('date')
	.exec((err, messages) => res.json(messages))

})

app.listen(3001)