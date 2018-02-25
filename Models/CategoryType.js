var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var date = new Date();
var CategoryType = new Schema({
    CategoryTypeID:{type:String},
    CategoryTypeName:{type:String,unique:true},
    created_at: {type:Date,default:date},
    updated_at: {type:Date,default:date}
},{ collection: 'CategoryType' });
module.exports = mongoose.model('CategoryType', CategoryType);