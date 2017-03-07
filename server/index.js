var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../models/users') //importing users
var app = express();

mongoose.connect('mongodb://localhost/doghouse')

app.use(bodyParser.json());

// app.get('/test', function(req, res){
// 	new User({							//creating user object
// 		name: 'Nathan',
// 		password: 'guest'
// 	}).save(function(err, response){
// 		res.json(response)
// 	})
// })

app.post('/api/user', function(req,res){
	console.log('body', req.body);
	var user = new User ({
		name: req.body.name,
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

app.put('/api/message', function(req,res){
	if (no message exists bw user1 & user2) {
		var message = new Message ({	//if statement to see if message is existing
		user1: req.body.user1
		user2: req.body.user2
		text: req.body.text 		//push this text onto existing message
		timestamp: req.body.timestamp
	}) else {
		message.push(var.body.text)	
		}
	}
	message.save(function(err, result){
		if (err) {
			res.status(500)
			res.json(err)
		} else {
			res.send(result);
		}
	})
})

app.get('/',function(req, res){
	res.json({server: 'up'})
})
app.listen(3001)