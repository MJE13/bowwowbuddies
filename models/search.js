var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var searchSchema = new Schema({
	"address": String,
	"lat": Number,
	"lng" : Number
})

module.exports = mongoose.model('Search', searchSchema);