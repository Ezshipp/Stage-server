var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Business = new Schema({
    BusinessID:{type:String},
    BusinessName:{type:String},
    CategoryTypeID:{type:String},
    CategoryTypeName:{type:String},
    Name:String,
    PhoneNumber:String,
    Address:String,
    Latitude:Number,
    Longitube:Number,
    Point:{type: [Number],
        index: '2d'},
    created_at: {type:Date},
    updated_at: {type:Date}
},{ collection: 'Business' });
Business.index({ Point: '2dsphere' });
module.exports = mongoose.model('Business', Business);