var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Vendors_Orders = new Schema({
    CustomerID: String,
    VendorID: String,
    VendorOrderID: String,
    Total_Weight:Number,
    Total_Orders:Number,
    Total_Price:Number,
    No_Of_Directions:Number,
    BearingArray:[Number],
    DetailsOrderIDArray:[String],
    DirectionArray:Array,
    IP_Address:String,
    Processing_Status:Number,
    created_at: Date,
    updated_at: Date
},{ collection: 'Vendors_Orders' });
module.exports = mongoose.model('Vendors_Orders', Vendors_Orders);