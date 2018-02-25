var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Offers_Group = new Schema({
    GroupID:String,
    GroupName:String,
    isActive:{type:Boolean,default:true},
    created_at: Date,
    updated_at: Date
},{ collection: 'Offers_Group' });
module.exports = mongoose.model('Offers_Group', Offers_Group);