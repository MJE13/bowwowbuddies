var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    "imgURL": String, 
	"username": {type: String, required: true},
	"password": {type: String, required: true},
    "admin": {type: Boolean, default: false},
	"address": {type: String, required: true},
    "about": String,
    "dogname": String,
    "sex": String,
    // "sterile": Boolean,
    // "vaccinations": Boolean,
    "age": String,
    "size": String,
    "breed": {type: String},
    "energylevel": String,
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
