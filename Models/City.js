var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var City = new Schema({
    name:String,
    location:{
        longitude:Number,
        latitude:Number
    },
    Currency:String
},{ collection: 'City' });
module.exports = mongoose.model('City', City);