var User = require('../models/users');
var request = require('superagent');

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
				imgURL: req.file.path.split('public')[1],
				username: req.body.username,
				password: req.body.password,
				address: req.body.address,
				about: req.body.about,
				dogname: req.body.dogname,
				sex: req.body.sex,
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
				res.status(500)
			res.json(err)
			} else {
				res.send(result);
				}
			})
		})

}		

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
	create : create
}