'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CustomerForgotPasswordTries = new Schema({
    Phone : String,
    time: Date
},{ collection: 'CustomerForgotPasswordTries' });
module.exports = mongoose.model('CustomerForgotPasswordTries', CustomerForgotPasswordTries);
