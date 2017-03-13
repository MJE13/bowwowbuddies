var Message = require('../models/messages') 

//  function create (req, res){
// 	console.log('body', req.body);
// 	// var message = new Message ({
// 	// 	from: req.body.from,
// 	// 	to: req.body.to,
// 	// 	text: req.body.text
// 	// })
// 	// message.save(function(err, result){
// 	// 	if (err) {
// 	// 		res.status(500)
// 	// 		res.json(err)
// 	// 	} else {
// 	// 		res.send(result);
// 	// 	}
// 	// })
// }

 function recieve (req, res){
 	// console.log(req.query)
 	
 	var message = new Message ({
 		from: req.query.from,
 		to: req.query.to,
 		text: req.query.text
 	})
 	var u1toU2 = {
 		from: message.from,
 		to: message.to
 	}
 	var u2toU1 = {
 		from: message.to,
 		to: message.from
 	}
 	message.save(function(err, result){
 		
 		if (err) {
 			res.status(500)
 			res.json(err)
 		} else {
 			Message.find({
 				$or : [u1toU2, u2toU1]
 			})
 			.sort('date')
 			.exec((err, messages) => res.json(messages))
 		}
 		console.log(req, res)
	})

}

 module.exports = {
	//create : create,
	recieve: recieve
}

