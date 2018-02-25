var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Vendors = new Schema({
    CustomerID: String,
    VendorID: String,
    DriverID:{type:String,default:""},
    VendorName:String,
    VendorEmail:String,
    VendorPhone: String,
    PickAddress: String,
    PickLatitude:Number,
    PickLongitude:Number,
    Price:Number,
    VendorStatus:{type:Boolean,default:true},
    created_at: Date,
    updated_at: Date
},{ collection: 'Vendors' });
module.exports = mongoose.model('Vendors', Vendors);