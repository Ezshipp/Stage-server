'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CustomerPasswordTries = new Schema({
    Phone : String,
    time: Date
},{ collection: 'CustomerPasswordTries' });
module.exports = mongoose.model('CustomerPasswordTries', CustomerPasswordTries);
