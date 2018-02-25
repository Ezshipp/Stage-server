var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Business_Branches = new Schema({
    BranchID:{type:String},
    BranchName:{type:String},
    BusinessID:{type:String},
    BusinessName:{type:String},
    CategoryTypeID:{type:String},
    CategoryTypeName:{type:String},
    Name:String,
    PhoneNumber:String,
    Address:String,
    Latitude:Number,
    Longitude:Number,
    Point:{type: [Number],
        index: '2d'},
    created_at: {type:Date},
    updated_at: {type:Date}
},{ collection: 'Business_Branches' });
Business_Branches.index({ Point: '2dsphere' });
module.exports = mongoose.model('Business_Branches', Business_Branches);