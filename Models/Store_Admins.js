var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Store_Admins = new Schema({
    StoreAdminID: { type: String, default: "" },
    Name: { type: String, default: "" },
    PhoneNumber: { type: String, default: "" },
    EmailID: { type: String, default: "" },
    PasswordHash: String,
    PasswordSalt: String,
    sessionToken: { type: String, default: "" },
    First_Time_Login: { type: Boolean, default: true },
    BranchData: [{
        BranchID: { type: String },
        Branch_Name: { type: String }
    }],
    Active_BranchID_Exist: { type: Boolean, default: false },
    Active_BranchID: { type: String, default: "" },
    Status: { type: Boolean, default: true },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { collection: 'Store_Admins' });
module.exports = mongoose.model('Store_Admins', Store_Admins);