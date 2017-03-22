var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var userController = require('../controllers/users');
var messagesController = require('../controllers/messages');
var searchesController = require('../controllers/search');
var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../models/users');
var fs = require('fs');
var multer = require('multer');
var path = require('path');



var port = process.env.PORT || 3001;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/doghouse');
app.set('superSecret', config.secret);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

var suffix = {
  'image/jpeg' : 'jpg',
  'image/png' : 'png'
}

app.use(express.static('build'))
app.use(express.static('public'))

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    console.log('directory ',path.join(__dirname, '../public/profilePictures/'))
    cb(null,path.join(__dirname, '../public/profilePictures'))
  },
  filename: function (req, file, cb){
    console.log('naming file',  file.fieldname + Date.now() +'.'+ suffix[file.mimetype])
    cb(null, file.fieldname + Date.now() +'.'+ suffix[file.mimetype] )
  }
})

var upload = multer({storage: storage}).single("profilePicture")


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

app.get('/', function(req, res) {
	res.send('Hello!  This is working!')
})

function requireLogin(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        req.user = decoded._doc //as long as we're logged in we can refer to the user info by req.user
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
}

app.post('/api/authenticate', userController.authenticate)

app.post('/api/user', upload, userController.create)

app.post('/api/messages', requireLogin, messagesController.create)

app.get('/api/messages', requireLogin, messagesController.receive)

app.get('/api/profile', requireLogin,(req, res) => res.json(req.user))

app.get('/api/user', requireLogin, searchesController.receive)

app.get('/api/findFriend/:username', searchesController.findFriend)

app.get('/api/sentMessages', requireLogin, messagesController.sentMessages)

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.listen(port)