var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MessageSchema = Schema({
	user1: String,
	user2: String,
	text: String,
	timestamp: { type: Date, default : new Date() }
})

module.exports = mongoose.model('Message', MessageSchema);