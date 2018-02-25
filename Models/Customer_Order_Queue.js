var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer_Order_Queue = new Schema({
    QueueID: String,
    CustomerID: String,
    CustomerName: String,
    CustomerPhone: String,
    CustomerEmailID: String,
    OrderSheetID: String,
    OrderSheetNumber: Number,
    filename: String,
    ProcessStage: { type: Number, default: 1 }, //1.Queue is Ready for Order 2.Queue Order Generarated
    No_Of_Records: Number,
    No_Of_Directions: Number,
    BearingArray: [Number],
    RecordOrderArray: Array,
    DirectionalOrderArray: Array,
    Status: { type: Boolean, default: true },
    created_at: Date,
    updated_at: Date
}, { collection: 'Customer_Order_Queue' });
module.exports = mongoose.model('Customer_Order_Queue', Customer_Order_Queue);