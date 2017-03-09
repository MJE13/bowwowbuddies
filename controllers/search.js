var Search = require('../models/search')

function create (req, res){
	console.log('body', req.body);
	var addy = req.body.address;
	var addyPlus = addy.replace(/ /g, "+");
	var first = "http://maps.googleapis.com/maps/api/geocode/json?address=";
	var last = "&AIzaSyDZImnAo3t9Ye0cjExfCq_0mc38ngMS7lM";
	var geoURL = first.concat(addyPlus).concat(last);
	var search = new Search ({
		address: req.body.address,
		geoRes: geoURL 
	})
	search.save(function(err, result){
		if (err) {
			res.status(500)
			res.json(err)
		} else {
			res.send(result); 
		}
	})
}

module.exports = {
	create : create
}