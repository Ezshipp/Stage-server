'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer_Order_Sheets = new Schema({
    OrderSheetID: String,
    CustomerID: String,
    CustomerName: String,
    CustomerPhone: String,
    CustomerEmailID: String,
    filename: String,
    OrderSheetNumber: Number,
    Total_Records: { type: Number, default: 0 },
    Processed_Records: { type: Number, default: 0 },
    FileUrl: { type: String, default: "" },
    ProcessStage: Number, //1. Sheet Initiated 2.Sheet Uloaded and Processing Started 3.Sheet All Record Processed
    Status: { type: Boolean, default: true },//if true it is active
    created_at: Date,
    updated_at: Date
}, { collection: 'Customer_Order_Sheets' });
module.exports = mongoose.model('Customer_Order_Sheets', Customer_Order_Sheets);