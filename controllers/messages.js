var Message = require('../models/messages') 
// var Header = require('../src/Header')

 function create (req, res){
	console.log('body', req.body);
	var message = new Message ({
		from: req.body.from,
		to: req.body.to,
		text: req.body.text
	})
	message.save(function(err, result){
		if (err) {
			res.status(500)
			res.json(err)
		} else {
			res.send(result);
		}
	})
}

 function recieve (req, res){
 	var user1 = req.query.user
 	var user2 = req.user.username
 	console.log(user1, user2)
 	var u1toU2 = {
 		from: user1,
 		to: user2
 	}
 	var u2toU1 = {
 		from: user2,
 		to: user1
 	}
	
	Message.find({
		$or : [u1toU2, u2toU1]
		})
		.sort('date')
		.exec((err, messages) => res.json(messages)) // tests for a match in the string (res.json)
		//console.log(req, res)		
}


 module.exports = {
	create : create,
	recieve: recieve
}

