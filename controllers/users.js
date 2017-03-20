var User = require('../models/users');	
var request = require('superagent');
var config = require('../config');


function create (req, res){
	console.log('body', req.body);
	var addy = req.body.address;
	var addyPlus = addy.replace(/ /g, "+");
	var first = "http://maps.googleapis.com/maps/api/geocode/json?address=";
	var last = "&AIzaSyDZImnAo3t9Ye0cjExfCq_0mc38ngMS7lM";
	var geoURL = first.concat(addyPlus).concat(last);
	request
		.get(geoURL)
		.end(function(err, geoRes){
	   		var location = JSON.parse(geoRes.text).results[0].geometry.location;
			var user = new User ({
				imgURL: (req.file ? req.file.path.split('public')[1] : ""),
				username: req.body.username,
				password: req.body.password,
				address: req.body.address,
				about: req.body.about,
				dogname: req.body.dogname,
				sex: req.body.sex,
				sterile: req.body.sterile,
				vaccinations: req.body.vaccinations,
			    age: req.body.age,
			    size: req.body.size,
				breed: req.body.breed,
				energylevel: req.body.energylevel,
				anything: req.body.anything,
				lat: location.lat,
				lng: location.lng,
				location : {
    				coordinates: [location.lng, location.lat]
  				}
			})
			user.save(function(err, result){
				if (err) {
					res.status(500);
					res.json(err);
				} else {
					const token = jwt.sign(user, config.secret);
					res.send({token: token, result});
				}
			})
		})

}	

function authenticate(req, res) {
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
			
			var token = jwt.sign(user, config.secret);

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
};	

// function edit(req, res){
// 	console.log('body', req.body);
// 	var addy = req.body.address;
// 	var addyPlus = addy.replace(/ /g, "+");
// 	var first = "http://maps.googleapis.com/maps/api/geocode/json?address=";
// 	var last = "&AIzaSyDZImnAo3t9Ye0cjExfCq_0mc38ngMS7lM";
// 	var geoURL = first.concat(addyPlus).concat(last);
// 	request
// 		.get(geoURL)
// 		.end(function(err, geoRes){
// 	   		var location = JSON.parse(geoRes.text).results[0].geometry.location;
// 			var user = new User ({
				// username: req.body.username,  //cannot allow them to change username!
				// password: req.body.password,
				// address: req.body.address,
				// about: req.body.about,
				// sex: req.body.sex,
			 //    age: req.body.age,
			 //    size: req.body.size,
				// breed: req.body.breed,
				// energylevel: req.body.energylevel,dogname: req.body.dogname,
				// breed: req.body.breed,
				// anything: req.body.anything,
				// lat: location.lat,
				// lng: location.lng,
// 				location : {
//     				coordinates: [location.lng, location.lat]
//   				}
// 			})
// 			user.save(function(err, result){
// 				if (err) {
// 				res.status(500)
// 			res.json(err)
// 			} else {
// 				res.send(result);
// 				}
// 			})
// 		})

// }

// function delete(req, res){

// }

module.exports = {
	create : create,
	authenticate: authenticate
}