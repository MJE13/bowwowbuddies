var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../models/users')
var app = express();

mongoose.connect('mongodb://localhost/doghouse')

app.get('/test', function(req, res){
	new User({
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