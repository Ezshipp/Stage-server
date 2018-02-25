var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer_New_Order_Directions_Data = new Schema({
    SequenceID: String,
    DirectionID: String,
    CustomerID: String,
    CustomerName: String,
    CustomerPhone: String,
    CustomerEmailID: String,
    Direction_No: Number,
    Processing_State: Number,//1.Initiated 2.Order Routed
    DriverID: { type: String, default: "" },
    DriverName: { type: String, default: "" },
    DriverPhone: { type: String, default: "" },
    RecordOrderArray: Array,
    created_at: Date,
    updated_at: Date
}, { collection: 'Customer_New_Order_Directions_Data' });
module.exports = mongoose.model('Customer_New_Order_Directions_Data', Customer_New_Order_Directions_Data);