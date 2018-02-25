var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vendor_Orders_Detail = new Schema({
    CustomerID: String,
    VendorID: String,
    VendorOrderID: String,
    VendorOrderDetailID: String,
    DriverID:{type:String,default:""},
    orderType:{type:Number,default:1},
    bookingType:{type:Number,default:3},
    PickAddress: String,
    PickLatitude:Number,
    PickLongitude:Number,
    DropAddress: String,
    DropLatitude:Number,
    DropLongitude:Number,
    PickDropDistance:Number,
    receiverName:String,
    receiverPhone:String,
    paymentType:Number,
    paymentId:String,
    itemName:String,
    itemweight:String,
    itemDescription:String,
    deliverycharge:String,
    Pincode:String,
    LocationFound:Boolean,
    IP_Address:String,
    created_at: Date,
    updated_at: Date
},{ collection: 'Vendor_Orders_Detail' });
module.exports = mongoose.model('Vendor_Orders_Detail', Vendor_Orders_Detail);