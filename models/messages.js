var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MessageSchema = Schema({
	"from": String,
	"to": String,
	"text": [String],
	"date": {type: Date, default: new Date()}
})

module.exports = mongoose.model('Message', MessageSchema);