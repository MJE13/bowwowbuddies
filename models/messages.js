var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MessageSchema = Schema({
	"from": String,
	"to": String,
	"text": [String],
	"received": {type: Boolean, default: false},
	"date": {type: Date, default: new Date()}
})

module.exports = mongoose.model('Message', MessageSchema);