var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	"username": {type: String, required: true},
	"password": {type: String, required: true},
    "admin": {type: Boolean, default: false},
	"address": {type: String, required: true},
    "about": String,
    "dogname": String,
    "breed": {type: String},
    "anything": String,
    "lng": Number,
    "lat": Number,
    location : {
        type: { 
            type: String,
            default: 'Point'
        }, 
        coordinates: [Number]
    }
})

UserSchema.index({ location : '2dsphere' });


module.exports = mongoose.model('User', UserSchema);