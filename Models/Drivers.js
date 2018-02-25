var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Drivers = new Schema({
    driverseqId: Number,
    name: String,
    lname: String,
    email: String,
    password: String,
    type_id: Number,
    acc_status: Number,
    countryCode: String,
    phone: String,
    created_dt: String,
    last_active_dt: String,
    profilePic: String,
    depoId: String,
    lic_expiry_dt: String,
    license_pic: String,
    bank_passbook: String,
    bank_country: String,
    Account_num: String,
    Routing_num: String,
    bank_name: String,
    businessid: String,
    Salary_Assigned: { type: Boolean, default: false },
    Salary: { type: Number, default: 0 },
    Devices: [{
        DeviceType: Number,
        OS: String,
        DeviceId: String,
        DeviceToken: String,
        AppVersion: String,
        LastOnline: String,
        DeviceModel: String,
        DeviceMake: String,
        Active: String
    }],
    location: {
        longitude: { type: Number, default: 78.36710900000003 },
        latitude: { type: Number, default: 17.43673 }
    },
    sessionToken: String,
    CurrentStatus: Number,
    status: Number,
    LastOnline: String,
    app_ids: [{
        app_id: String,
        timestamp: Number,
        datetime: String
    }],
    newapp_ids: [{
        app_id: String,
        timestamp: String,
        datetime: String
    }],
    Location: {
        Longitude: { type: Number, default: 78.36710900000003 },
        Latitude: { type: Number, default: 17.43673 }
    },
    Bank_Details_Available: {
        type: Boolean,
        default: false
    },
    Bank_Account_No: { type: String, default: "" },
    Bank_Name: { type: String, default: "" },
    Bank_IFSC_No: { type: String, default: "" },
    Bank_Passbook_Image: { type: String, default: "" },
    Driving_License_Available: {
        type: Boolean,
        default: false
    },
    Driving_License_Image: { type: String, default: "" },
    Driving_License_Expiry_Date: Date,
    Address_Proof_Available: {
        type: Boolean,
        default: false
    },
    Address_Proof_Details: { type: String, default: "" },
    Address_Proof_Image: { type: String, default: "" },
    Ezshipp_Branch_Details_Available: {
        type: Boolean,
        default: false
    },
    Ezshipp_BranchID: { type: String, default: "" },
    Ezshipp_Branch_Name: { type: String, default: "" },
    EmployeeID: { type: String, default: "" }
}, { collection: 'Drivers' });
// Drivers.index({ Point: '2dsphere' });
module.exports = mongoose.model('Drivers', Drivers);