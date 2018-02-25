var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer_Order_Queue_Directions = new Schema({
    QueueID: String,
    DirectionID: String,
    CustomerID: String,
    CustomerName: String,
    CustomerPhone: String,
    CustomerEmailID: String,
    Direction_No: Number,
    Processing_State: Number,//1.Initiated 2.Order Placed
    DriverID: { type: String, default: "" },
    DriverName: { type: String, default: "" },
    DriverPhone: { type: String, default: "" },
    RecordOrderArray: Array,
    created_at: Date,
    updated_at: Date
}, { collection: 'Customer_Order_Queue_Directions' });
module.exports = mongoose.model('Customer_Order_Queue_Directions', Customer_Order_Queue_Directions);