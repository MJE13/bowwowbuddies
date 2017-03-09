var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var searchSchema = new Schema({
	"address": String,
	"geoRes": String
})

module.exports = mongoose.model('search', searchSchema);