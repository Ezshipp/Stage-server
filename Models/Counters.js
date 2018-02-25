var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Counters = new Schema({
    _id:String,
    seq:Number
},{ collection: 'counters' });
module.exports = mongoose.model('counters', Counters);