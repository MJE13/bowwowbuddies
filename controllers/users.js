var User = require('../models/users')

function create (req, res){
	console.log('body', req.body);
	var user = new User ({
		username: req.body.username,
		password: req.body.password,
		address: req.body.address,
        about: req.body.about,
        dogname: req.body.dogname,
        breed: req.body.breed,
        anything: req.body.anything
	})
	user.save(function(err, result){
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