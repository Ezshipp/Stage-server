var express = require('express'),
    router = express.Router();
var async = require('async');
var moment = require('moment');
var randomstring = require("randomstring");
ObjectID = require('mongodb').ObjectID;

var Config = require("../Config/config.js");
var config = require("../Config/config.js");
var razorpay_key = config.razorpay.key_id;
var razorpay_secret = config.razorpay.key_secret;
exports.Check_for_Payment = function (data, callback) {
    var request = require('request');
    request('https://' + razorpay_key + ':' + razorpay_secret + '@api.razorpay.com/v1/payments/' + data.paymentId, function (error, response, body) {
        var response = JSON.parse(body);
        if (response.error == null) {
            return callback(false,response);
        } else {
            return callback(true,response);
        }
    });
}
exports.captureamount = function (data, callback) {
    var request = require('request');
    request({
  method: 'POST',
  url: 'https://' + razorpay_key + ':' + razorpay_secret + '@api.razorpay.com/v1/payments/' + data.paymentId+'/capture',
  form: {
    amount: data.total_amount * 100
  }
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
         if (error) {
            var response1 = {
                "errNum": 1004,
                "errMsg": "razorpay payment failed",
                "response": error,
                "errFlag": 1
            }
            return callback(response1);


        } else {
            var response1 = {
                "errNum": 1004,
                "errMsg": "razorpay payment success",
                "response": response,
                "errFlag": 0
            }
            return callback(response1);
        }

});
}

