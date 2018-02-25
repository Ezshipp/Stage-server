var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var can_reason  = new Schema({
    res_id:Number,
    reasons:[String],
    res_for:String
},{ collection: 'can_reason' });
module.exports = mongoose.model('can_reason', can_reason );