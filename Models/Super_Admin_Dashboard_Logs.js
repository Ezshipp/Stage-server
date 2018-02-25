var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Super_Admin_Dashboard_Logs = new Schema({
    AdminID: { type: String, default: "" },
    AdminName: { type: String, default: "" },
    Message: { type: String, default: "" },
    Purpose: { type: String, default: "" },
    Key: { type: String, default: "" },
    Whether_God: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now() }
}, { collection: 'Super_Admin_Dashboard_Logs' });
module.exports = mongoose.model('Super_Admin_Dashboard_Logs', Super_Admin_Dashboard_Logs);