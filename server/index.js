var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var SendBird = require('sendbird'); //grabbing what we downloaded
var sb = SendBird('<b717f925e886e814d7170ba399df8f4db0590566>'); 
var User = require('../models/users') //importing users
var app = express();

mongoose.connect('mongodb://localhost/doghouse')

app.get('/test', function(req, res){
	new User({							//creating user object
		name: 'Nathan',
		password: 'guest'
	}).save(function(err, response){
		res.json(response)
	})
})


app.use(bodyParser.json());
app.get('/',function(req, res){
	res.json({server: 'up'})
})
app.listen(3001)