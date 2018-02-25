'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer_Order_Sheet_Records = new Schema({
    OrderSheetID: String,
    OrderSheetNumber: Number,
    RecordID: String,
    CustomerID: String,
    CustomerName: String,
    CustomerPhone: String,
    CustomerEmailID: String,
    itemName: { type: String, default: "" },
    itemDescription: { type: String, default: "" },
    order_datetime: { type: String, default: "" },
    Monthly_Invoice: { type: Boolean, default: false },
    orderType: { type: Number, default: 1 },
    bookingType: { type: Number, default: 3 },
    paymentType: { type: Number, default: 1 },
    collectionType: { type: Number, default: 1 },
    deliverycharge: { type: String, default: "" },
    paymentType: { type: Number, default: 1 },
    paymentId: { type: String, default: "" },
    pickAddress: { type: String, default: "" },
    dropAddress: { type: String, default: "" },
    pickLatitude: Number,
    pickLongitude: Number,
    dropLatitude: Number,
    dropLongitude: Number,
    receiverName: { type: String, default: "" },
    receiverPhone: { type: String, default: "" },
    Status: Number, //1. Initiated 2. Pick and Drop Address Found 3.Pick and Drop are in Zone and in Same City 4.Ready for Order 5.Order Queued 6.Order Placed  8. Error
    Message: { type: String, default: "" },
    created_at: Date,
    updated_at: Date
}, { collection: 'Customer_Order_Sheet_Records' });
module.exports = mongoose.model('Customer_Order_Sheet_Records', Customer_Order_Sheet_Records);