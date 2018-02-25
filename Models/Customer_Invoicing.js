'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer_Invoicing = new Schema({
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
}, { collection: 'Customer_Invoicing' });
module.exports = mongoose.model('Customer_Invoicing', Customer_Invoicing);