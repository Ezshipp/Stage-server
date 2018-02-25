'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Admin_Logs = new Schema({
    AdminID: String,
    Admin_Name: String,
    Message: String,
    created_at: Date,
    updated_at: Date
}, { collection: 'Admin_Logs' });
module.exports = mongoose.model('Admin_Logs', Admin_Logs);