var Message = require('../models/messages') 
var User = require('../models/users');
var mongoose = require('mongoose');
 function create (req, res){
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
 function receive (req, res){
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
        .exec((err, messages) => {
            console.log({from: user1, to: user2});
            Message.update({from: user1, to: user2}, {$set: {received: true}}, {multi: true}, function(err, update){ //making sure the recieved messages are marked true upon getting to friends profile
                res.json(messages)
            })
        }) // tests for a match in the string (res.json)
        //console.log(req, res)     
}
function messageFriend(req, res){
        User.findOne({
            username: req.params.username
        }, function(err, result) {
                console.log(err, result)
                res.json(result.username)
            }
        )   
}
function sentMessages(req, res){
    console.log(req.user)
    Message.find({
        to: req.user.username,
        received: false
    })
        .sort('date')
        .exec((err, messages) =>{ console.log(messages, err); res.json(messages)})
}
 module.exports = {
    create : create,
    receive: receive,
    messageFriend: messageFriend,
    sentMessages: sentMessages
}





