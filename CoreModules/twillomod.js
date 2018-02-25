var twillomod = function(){

    this.crypto = require('crypto');
    this.uuid = require('uuid');
    this.rand = require('csprng');
    this.ApiResponce = require("../Models/Apiresponce.js");
    this.ApiMessages = require("../Models/Apimessages.js");
    this.Config = require("../Config/config.js");
    this.config = require("../Config/config.js");
    this.Counters = require('../Models/Counters.js');
    this.Customers = require('../Models/Customers.js');
    this.randomstring = require("randomstring");

    this.TWILIO_ACCOUNT_SID = this.config.twilio.ACCOUNT_SID;
    this.TWILIO_AUTH_TOKEN = this.config.twilio.AUTH_TOKEN;

    this.twilio = require('twilio');
    this.client = new this.twilio.RestClient(this.TWILIO_ACCOUNT_SID, this.TWILIO_AUTH_TOKEN);
};
//Send OTP to Customer Phone Number
twillomod.prototype.sendsms = function (Phone,otp,callback) {
    var me = this;
    me.client.messages.create({
        to: Phone,
        from: me.config.twilio.TWILIO_NUMBER,
        body: 'One Time Password for ezshipp is ' + otp + ', Please use this password to login. '
    }, function (err, message) {
        if (message) {
            return callback(false,'Message Sent Successfully');
        } else {
            return callback(true,'Message Failed');
        }
    });
};
//Send Message to Customer Phone Number
twillomod.prototype.sendsmstocustomer = function (Phone,Message,callback) {
    var me = this;
    me.client.messages.create({
        to: Phone,
        from: me.config.twilio.TWILIO_NUMBER,
        body: Message
    }, function (err, message) {
        if (message) {
            return callback(false,'Message Sent Successfully');
        } else {
            return callback(true,'Message Failed');
        }
    });
};
module.exports = twillomod;