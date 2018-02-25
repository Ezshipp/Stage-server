var msg91mod = function () {

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
    // this.client = new this.twilio.RestClient(this.TWILIO_ACCOUNT_SID, this.TWILIO_AUTH_TOKEN);
    this.msg91 = require("msg91")(this.config.msg91.authkey, this.config.msg91.sender_id, this.config.msg91.route_no);   // "AUTHKEY", "SENDER_ID", "ROUTE_NO"
};
var SMS_Providers = require('../Models/SMS_Providers.js');
const querystring = require('querystring');
var request = require('request');

//Send Franchise Credentials
msg91mod.prototype.Send_Franchise_Credentials = function (EntityData, Password, callback) {
    var me = this;
    var Message = "Hi " + EntityData.Store_Entity_Name + ", Your UserName: " + EntityData.Phone_Number + " and Password:" + Password + " ,use this credentials and Login at https://goo.gl/2x6UhQ";
    SMS_Providers.findOne({ Selected_Provider: true }, function (err, SMS_Service) {
        if (SMS_Service == null) {
            me.msg91.send(EntityData.Phone_Number, Message, function (err, response) {
                return callback(false, 'Message Sent Successfully');
            });
        } else {
            if (parseInt(SMS_Service.Service_Type) == 1) {  //msg91
                me.msg91.send(EntityData.Phone_Number, Message, function (err, response) {
                    return callback(false, 'Message Sent Successfully');
                });
            } else if (parseInt(SMS_Service.Service_Type) == 2) {   //Solutions Infini
                console.log("Default solutions infini");
                var PhoneNumber = EntityData.Phone_Number;
                var newmessage = querystring.escape(Message);
                request({
                    method: 'POST',
                    url: 'https://alerts.solutionsinfini.com/api/v4/?api_key=A8ecd35d466a2e278ca5d53a8fda8c2d7&sender=EZSHIP&method=sms&to=' + PhoneNumber + '&message=' + newmessage
                }, function (error, response, body) {
                    var Response = JSON.parse(body);
                    callback(false, 'Message Sent Successfully');
                    if (Response.status == "OK") {

                    } else {
                        console.log("message fail due to " + Response.message);
                        console.log(PhoneNumber);console.log(Message);
                    }
                })
            }
        }
    })
}

//Testing
msg91mod.prototype.sendTestSMS = function (callback) {
    var me = this;
    var Message = "Hi uday"
    SMS_Providers.findOne({ Selected_Provider: true }, function (err, SMS_Service) {
        if (SMS_Service == null) {
            me.msg91.send(8801362790, Message, function (err, response) {
                return callback(false, 'Message Sent Successfully');
            });
        } else {
            if (parseInt(SMS_Service.Service_Type) == 1) {  //msg91
                me.msg91.send(8801362790, Message, function (err, response) {
                    return callback(false, 'Message Sent Successfully');
                });
            } else if (parseInt(SMS_Service.Service_Type) == 2) {   //Solutions Infini
                console.log("Default solutions infini");
                var PhoneNumber = 8801362790;
                var newmessage = querystring.escape(Message);
                request({
                    method: 'POST',
                    url: 'https://alerts.solutionsinfini.com/api/v4/?api_key=A8ecd35d466a2e278ca5d53a8fda8c2d7&sender=EZSHIP&method=sms&to=' + PhoneNumber + '&message=' + newmessage
                }, function (error, response, body) {
                    var Response = JSON.parse(body);
                    callback(false, 'Message Sent Successfully');
                    if (Response.status == "OK") {

                    } else {
                        console.log("message fail due to " + Response.message);
                        console.log(PhoneNumber);console.log(Message);
                    }
                })
            }
        }
    })
};

//Send OTP to Customer Phone Number
msg91mod.prototype.sendsms = function (Phone, otp, callback) {
    var me = this;
    var Message = 'One Time Password for ezshipp is ' + otp + ', Please use this password to login.';
    SMS_Providers.findOne({ Selected_Provider: true }, function (err, SMS_Service) {
        if (SMS_Service == null) {
            me.msg91.send(Phone, Message, function (err, response) {
                return callback(false, 'Message Sent Successfully');
            });
        } else {
            if (parseInt(SMS_Service.Service_Type) == 1) {  //msg91
                me.msg91.send(Phone, Message, function (err, response) {
                    return callback(false, 'Message Sent Successfully');
                });
            } else if (parseInt(SMS_Service.Service_Type) == 2) {   //Solutions Infini
                console.log("Default solutions infini");
                var PhoneNumber = Phone;
                var newmessage = querystring.escape(Message);
                request({
                    method: 'POST',
                    url: 'https://alerts.solutionsinfini.com/api/v4/?api_key=A8ecd35d466a2e278ca5d53a8fda8c2d7&sender=EZSHIP&method=sms&to=' + PhoneNumber + '&message=' + newmessage
                }, function (error, response, body) {
                    var Response = JSON.parse(body);
                    callback(false, 'Message Sent Successfully');
                    if (Response.status == "OK") {

                    } else {
                        console.log("message fail due to " + Response.message);
                        console.log(PhoneNumber);console.log(Message);
                    }
                })
            }
        }
    })
};
//Send Guest Login OTP to Phone Number 
msg91mod.prototype.Send_SMS_Guest_Login = function (Phone, otp, callback) {
    var me = this;
    var Message = 'One Time Password for Ezshipp Guest Login is ' + otp + ', Please use this password to login.';
    SMS_Providers.findOne({ Selected_Provider: true }, function (err, SMS_Service) {
        if (SMS_Service == null) {
            me.msg91.send(Phone, Message, function (err, response) {
                return callback(false, 'Message Sent Successfully');
            });
        } else {
            if (parseInt(SMS_Service.Service_Type) == 1) {  //msg91
                me.msg91.send(Phone, Message, function (err, response) {
                    return callback(false, 'Message Sent Successfully');
                });
            } else if (parseInt(SMS_Service.Service_Type) == 2) {   //Solutions Infini
                console.log("Default solutions infini");
                var PhoneNumber = Phone;
                var newmessage = querystring.escape(Message);
                request({
                    method: 'POST',
                    url: 'https://alerts.solutionsinfini.com/api/v4/?api_key=A8ecd35d466a2e278ca5d53a8fda8c2d7&sender=EZSHIP&method=sms&to=' + PhoneNumber + '&message=' + newmessage
                }, function (error, response, body) {
                    var Response = JSON.parse(body);
                    callback(false, 'Message Sent Successfully');
                    if (Response.status == "OK") {

                    } else {
                        console.log("message fail due to " + Response.message);
                        console.log(PhoneNumber);console.log(Message);
                    }
                })
            }
        }
    })
};


//Send Message to Customer Phone Number
msg91mod.prototype.sendsmstocustomer = function (Phone, Message, callback) {
    var me = this;
    SMS_Providers.findOne({ Selected_Provider: true }, function (err, SMS_Service) {
        if (SMS_Service == null) {
            me.msg91.send(Phone, Message, function (err, response) {
                return callback(false, 'Message Sent Successfully');
            });
        } else {
            if (parseInt(SMS_Service.Service_Type) == 1) {  //msg91
                me.msg91.send(Phone, Message, function (err, response) {
                    return callback(false, 'Message Sent Successfully');
                });
            } else if (parseInt(SMS_Service.Service_Type) == 2) {   //Solutions Infini
                console.log("Default solutions infini");
                var PhoneNumber = Phone;
                var newmessage = querystring.escape(Message);
                request({
                    method: 'POST',
                    url: 'https://alerts.solutionsinfini.com/api/v4/?api_key=A8ecd35d466a2e278ca5d53a8fda8c2d7&sender=EZSHIP&method=sms&to=' + PhoneNumber + '&message=' + newmessage
                }, function (error, response, body) {
                    var Response = JSON.parse(body);
                    callback(false, 'Message Sent Successfully');
                    if (Response.status == "OK") {

                    } else {
                        console.log("message fail due to " + Response.message);
                        console.log(PhoneNumber);console.log(Message);
                    }
                })
            }
        }
    })
}
module.exports = msg91mod;