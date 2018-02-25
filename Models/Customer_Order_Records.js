'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer_Order_Records = new Schema({
    RecordID: String,
    CustomerID: String,
    CustomerName: String,
    CustomerPhone: String,
    from_date: Date,
    to_date: Date,
    RecordNumber: String,
    PDFLink: { type: String, default: "" },
    ProcessStage: Number,
    Payment_Received: {
        type: Boolean,
        default: false
    },
    Payment_Time: Date,
    created_at: Date,
    updated_at: Date
}, { collection: 'Customer_Order_Records' });
module.exports = mongoose.model('Customer_Order_Records', Customer_Order_Records);