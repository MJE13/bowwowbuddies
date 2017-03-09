var Search = require('../models/search');
var request = require('superagent');
var User = require('../models/users');

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
  				var search = new Search ({
					address: req.body.address,
					lat: location.lat, 
					lng: location.lng
				})
				search.save(function(err, result){
					if (err) {
						res.status(500)
						res.json(err)
					} else {
						res.send(result); 
					}
				})
			})
}

function recieve (req, res){
	var address = req.query.address
	console.log(address)
	User.find({
		username: "Turbo"
	})
	.exec((err, users) => res.json(users))
}

 module.exports = {
	create : create,
	recieve: recieve
}
