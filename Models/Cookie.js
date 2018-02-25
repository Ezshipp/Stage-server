var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Cookie = new Schema({
    Cookie:String,
    time:Date
},{ collection: 'Cookie' });
module.exports = mongoose.model('Cookie', Cookie);