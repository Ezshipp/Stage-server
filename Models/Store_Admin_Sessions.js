'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Store_Admin_Sessions = new Schema({
    StoreAdminID: String,
    SessionID: String,
    created_at: Date,
    updated_at: Date
},{ collection: 'Store_Admin_Sessions' });

module.exports = mongoose.model('Store_Admin_Sessions', Store_Admin_Sessions);
