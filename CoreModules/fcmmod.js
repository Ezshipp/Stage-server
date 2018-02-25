var fcmmod = function () {

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

    this.distance = require('google-distance-matrix');
    this.distance.key(this.config.googleapikey);
    this.distance.units('imperial');
    this.distance.mode('driving');
    this.FCM = require('fcm-push');
    this.serverKey = this.config.fcmseverkey;
    this.fcm = new this.FCM(this.serverKey);
    var config = this.config;

};
//customerapp
fcmmod.prototype.sendpush_android_ios = function (data, callback) {
      var me = this;
    var message = {
        to: data.devicetoken, // required fill with device token or topics
        collapse_key: 'your_collapse_key',
        priority: 'high',
        data: data.message,
        notification: {
            title: data.notify.title,
            body: data.notify.body,
            sound: "default",
            alert: "true",
            vibrate: true,
            badge: 1
        }
    };
    //callback style
    me.fcm.send(message, function (err, response) {
        if (err) {
            console.log("FCM Error" + JSON.stringify(err));
            return callback(true, "fail");
        } else {
            return callback(false, "success");
        }
    });
}

fcmmod.prototype.sendpush_ios_driver = function (data, callback) {
    var me = this;
    var message = {
        to: data.devicetoken,
        collapse_key: 'your_collapse_key',
        priority: 'high',
        data: data.message,
        notification: {
            title: data.notify.title,
            body: data.notify.body,
            sound: "default",
            alert: "true",
            vibrate: true,
            badge: 1
        }
    };
    //callback style
    me.fcm.send(message, function (err, response) {
        if (err) {
            console.log("FCM Error" + JSON.stringify(err));
            return callback(true, "fail");
        } else {
            return callback(false, "success");
        }
    });
}; fcmmod.prototype.sendpush_android_driver = function (data, callback) {
    var me = this;
    var message = {
        to: data.devicetoken,
        collapse_key: 'your_collapse_key',
        priority: 'high',
        data: data.message
    };
    //callback style
    me.fcm.send(message, function (err, response) {
        if (err) {
            console.log("FCM Error" + JSON.stringify(err));
            return callback(true, "fail");
        } else {
            return callback(false, "success");
        }
    });
};
module.exports = fcmmod;