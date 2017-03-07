var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
	name: String,
	password: String
})

var MessageSchema = Schema({
	user1: String,
	user2: String,
	text: String,
	timestamp: { type: Date, default : new Date() }
})

module.exports = mongoose.model('User', UserSchema);