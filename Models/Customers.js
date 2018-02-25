var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosastic = require('mongoosastic');
var elasticsearch = require('elasticsearch');
var Customers = new Schema({
    CustomerID_Set: { type: Boolean, default: false },
    CustomerID: { type: String, default: "" },
    customerseqId: Number,
    acc_status: { type: Number, default: 1 },
    First_name: {
        type: String,
        es_indexed: true
    },
    Email: {
        type: String,
        default: "",
        es_indexed: true
    },
    Phone: {
        type: String,
        es_indexed: true
    },
    countryCode: { type: String, default: "" },
    Verify: { type: Number, default: 0 },
    Code: { type: Number, default: 0 },
    PasswordHash: String,
    PasswordSalt: String,
    CurrentStatus: { type: Number, default: 0 },
    sessionToken: { type: String, default: "" },
    First_Time_Login: { type: Boolean, default: false },
    terms_cond: { type: Number, default: 0 },
    referral_code: { type: String, default: "" },
    location: {
        longitude: { type: String, default: "" },
        latitude: { type: String, default: "" }
    },
    Location: {
        Longitude: { type: Number, default: 78.78981 },
        Latitude: { type: Number, default: 17.8782 }
    },
    Devices: [{
        DeviceType: { type: Schema.Types.Mixed, default: 3 },
        OS: { type: String, default: "WEBSITE" },
        DeviceId: String,
        DeviceToken: String,
        AppVersion: String,
        LastOnline: String,
        DeviceModel: String,
        DeviceMake: String,
        Active: String
    }],
    AddressLog: [{
        address1: {
            type: String,
            es_indexed: true
        },
        address2: String,
        addressID: String,
        landmark: {
            type: String,
            es_indexed: true
        },
        latitude: String,
        longitude: String,
        sTag: String
    }],
    CustomerImage: { type: String, default: "" },
    Whether_Guest: { type: Boolean, default: false },
    Created_dt: String,
    Vendor: { type: Boolean, default: false },
    Premium_User: { type: Boolean, default: false },
    Premium_User_Time: Date,
    Premium_Status: { type: Boolean, default: false },
    CustomerKey: { type: String, default: "" },
    Premium_Pricing_Set: { type: Boolean, default: false },
    Premium_Instant_Pricing: { type: Number, default: 0 },
    Premium_4hours_Pricing: { type: Number, default: 0 },
    Premium_Same_Day_Pricing: { type: Number, default: 0 },
        Premium_Instant_Pricing_discount: { type: Number, default: 0 },
    Premium_4hours_Pricing_discount: { type: Number, default: 0 },
    Premium_Same_Day_Pricing_discount: { type: Number, default: 0 },
    Premium_min_ordercount: { type: Number, default: 0 },
    Monthly_Invoice: { type: Boolean, default: false },
    Flat_Monthly_Price_Available: { type: Boolean, default: false },
    Flat_Monthly_Price: { type: Number, default: 0 },
    Default_Pickup_Location_Exist: { type: Boolean, default: false },
    Default_Pickup_Address: { type: String, default: "" },
    Default_Pickup_Latitude: { type: String, default: "" },
    Default_Pickup_Longitude: { type: String, default: "" },
    Whether_Store_Admin: { type: Boolean, default: false },
    BranchData: [{
        BranchID: { type: String },
        Branch_Name: { type: String }
    }],
    Active_BranchID_Exist: { type: Boolean, default: false },
    Active_BranchID: { type: String, default: "" },
    StoreAdminStatus: { type: Boolean, default: false },
    Agreement_Time: String,
    Whether_Web_Signup: { type: Boolean, default: true },
    Signup_Date: { type: Date, default: Date.now },
    Signup_Interval: { type: Number, default: 0 }
}, { collection: 'Customers' });

// const client = new elasticsearch.Client({
//     host: 'localhost:9200'
// })
// Customers.plugin(mongoosastic, {
//     esClient: client,
//     hydrate: true,
//     bulk: {}
// });
module.exports = mongoose.model('Customers', Customers);
