'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CUSTOMERSESSION = new Schema({
    CustomerID: String,
    SessionID: String,
    created_at: Date,
    updated_at: Date
},{ collection: 'CUSTOMERSESSION' });

module.exports = mongoose.model('CUSTOMERSESSION', CUSTOMERSESSION);
