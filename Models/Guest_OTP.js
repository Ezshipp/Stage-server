var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Guest_OTP = new Schema({
    Phone:String,
    countryCode:String,
    OTP:Number,
    time:Date,
    Latest:Boolean,
    created_at: Date,
    updated_at: Date
},{ collection: 'Guest_OTP' });
module.exports = mongoose.model('Guest_OTP', Guest_OTP);