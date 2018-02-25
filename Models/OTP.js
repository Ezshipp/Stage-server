var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OTP = new Schema({
    Phone:String,
    countryCode:String,
    OTP:Number,
    time:Date,
    Latest:Boolean,
    created_at: Date,
    updated_at: Date
},{ collection: 'OTP' });
module.exports = mongoose.model('OTP', OTP);