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

// app.get('/test', function(req, res){
// 	new User({							//creating user object
// 		name: 'Nathan',
// 		password: 'guest'
// 	}).save(function(err, response){
// 		res.json(response)
// 	})
// })

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

app.put('/api/messages', function(req,res){
	console.log('body', req.body);
	var message = new Message ({
		user1: req.body.user1,
		user2: req.body.user2,
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
	// if (no message exists bw user1 & user2) {
	// 	var message = new Message ({	//if statement to see if message is existing
	// 	user1: req.body.user1
	// 	user2: req.body.user2
	// 	text: req.body.text 		//push this text onto existing message
	// 	//timestamp: req.body.timestamp
	// }) else {
	// 	message.push(var.body.text)	
	// 	}
	// }
	// message.save(function(err, result){
	// 	if (err) {
	// 		res.status(500)
	// 		res.json(err)
	// 	} else {
	// 		res.send(result);
	// 	}
	// })


app.get('/',function(req, res){
	res.json({server: 'up'})
})
app.listen(3001)