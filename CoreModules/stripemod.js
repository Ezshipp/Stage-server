var stripemod = function(){

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

    //stripe card payment initialization
    this.stripe = require('stripe')(this.config.StripeKey);
    var config = this.config;

};
//Create Customer Stripe ID by Email
stripemod.prototype.createcustomerstripe = function (Email,callback) {
    var me = this;
    me.stripe.customers.create(
        { email: Email },
        function (err, customer) {
            if (!err) {
                var stripeId = customer.id;
                return callback(false,stripeId);
            }
        });
};
module.exports = stripemod;