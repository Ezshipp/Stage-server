'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer_CODReport = new Schema({
    CustomerInvoiceID: String,
    CustomerID:String,
    CustomerName:String,
    CustomerPhone:String,
    from_date:Date,
    to_date:Date,
    InvoiceNumber:Number,
    PDFLink:{type:String,default:""},
    ProcessStage:Number,
    Payment_Received:{
        type:Boolean,
        default:false
    },
    Payment_Time:Date,
    created_at: Date,
    updated_at: Date
}, { collection: 'Customer_CODReport' });
module.exports = mongoose.model('Customer_CODReport', Customer_CODReport);