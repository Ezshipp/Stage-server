var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var COOKIE_TOKEN_SECURITY = new Schema({
    Phone:String,
    countryCode:String,
    Cookie:String,
    time:Date,
    created_at: Date,
    updated_at: Date
},{ collection: 'COOKIE_TOKEN_SECURITY' });
module.exports = mongoose.model('COOKIE_TOKEN_SECURITY', COOKIE_TOKEN_SECURITY);