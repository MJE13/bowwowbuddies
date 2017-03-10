var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
	"username": String,
	"password": String,
	"address": String,
    "about": String,
    "dogname": String,
    "breed": String,
    "anything": String,
    "lat": Number,
    "lng": Number
})

module.exports = mongoose.model('User', UserSchema);