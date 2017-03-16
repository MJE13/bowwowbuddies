var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var userController = require('../controllers/users');
var messagesController = require('../controllers/messages');
var searchesController = require('../controllers/search');
//var expressJWT = require('express-jwt')
var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../models/users');
var fs = require('fs');
var multer = require('multer');
var path = require('path');



var port = process.env.PORT || 3001;
mongoose.connect('mongodb://localhost/doghouse');
app.set('superSecret', config.secret);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
// app.use(multer({dest: '../models/users', rename: function(fieldname, filename) {
//     return filename;
//     },
//  }));

var suffix = {
  'image/jpeg' : 'jpg',
  'image/png' : 'png'
}

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

app.post('/api/authenticate', function(req, res) {
	User.findOne({
		username: req.body.username
	}, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({success: false, message: 'Sorry Charlie, you aint authorized.' });
		}else if (user) {

			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentification failed, wrong password'});
			} else {
			
			var token = jwt.sign(user, app.get('superSecret'));

			res.json({
				success: true,
				message: 'Enjoy your hella trill token!',
				token: token,
        username: req.body.username,
        address: user.address
				});
			}
		}

  	})
});



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
        req.user = decoded._doc 
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

app.post('/api/testupload', upload, function(req, res){
  console.log(req.file.path.split('public')[1])
  res.json(req.file)
})

app.post('/api/user', userController.create)

app.post('/api/messages', requireLogin, messagesController.create)

app.get('/api/messages', requireLogin, messagesController.recieve)

app.get('/api/user', searchesController.recieve)

// app.put('/api/user', requireLogin, userController.edit)


app.listen(3001)