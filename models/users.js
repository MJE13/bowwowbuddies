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