var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LocationSchema = require('./location').LocationSchema;


var UserSchema = new Schema({
	"username": String,
	"password": String,
	"address": String,
    "about": String,
    "dogname": String,
    "breed": String,
    "anything": String,
    "lat": Number,
    "lng": Number,
    "loc" : LocationSchema
})

module.exports = mongoose.model('User', UserSchema);