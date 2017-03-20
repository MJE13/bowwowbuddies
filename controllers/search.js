var request = require('superagent');
var User = require('../models/users');
var GeoJSON = require('geojson');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken')

function recieve (req, res){
	var address = req.query.address;
	console.log(address)
	var addyPlus = address.replace(/ /g, "+");
	var distance = req.query.distance;
	var first = "http://maps.googleapis.com/maps/api/geocode/json?address=";
	var last = "&AIzaSyDZImnAo3t9Ye0cjExfCq_0mc38ngMS7lM";
	var geoURL = first.concat(addyPlus).concat(last);
	request
  		.get(geoURL)
  			.end(function(err, geoRes){
		   		var location = JSON.parse(geoRes.text).results[0].geometry.location;
				console.log(location)
				User.find({
					location: {
				    	$near: {
				    		$geometry : {
				    			type: "Point",
				    			coordinates: [location.lng, location.lat] 
				    		},
				    		$maxDistance : distance * 1609.34	
				  		}	
					}
				}, 
				function(err, result) {
					console.log(err, result)
					res.json(result)
				}
			)

		})
}

function findFriend(req, res){
		User.findOne({
			username: req.params.username
		}, function(err, result) {
				console.log(err, result)
				res.json(result)
			}
		)	
}
module.exports= {
	findFriend: findFriend,
	recieve: recieve
}
