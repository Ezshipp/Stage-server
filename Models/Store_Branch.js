var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Store_Branch = new Schema({
    EntityID: { type: String },
    BranchID: { type: String },
    Store_Entity_Name: { type: String },
    Branch_Name: { type: String },
    Branch_PhoneNumber: { type: String, default: "" },
    Website: { type: String, default: "" },
    Description: { type: String, default: "" },
    CategoryID: { type: String, default: "" },
    CategoryName: { type: String, default: "" },
    Branch_Image_URL: { type: String, default: "" },
    CountryID: { type: String, default: "" },
    CountryName: { type: String, default: "" },
    CityID: { type: String, default: "" },
    CityName: { type: String, default: "" },
    Address: { type: String, default: "" },
    Latitude: Number,
    Longitude: Number,
    Point: {
        type: [Number],
        index: '2d'
    },
    Monday_Available: { type: Boolean, default: true },
    Monday_Timings: [{
        From_Time: String,
        To_Time: String
    }],
    Tuesday_Available: { type: Boolean, default: true },
    Tuesday_Timings: [{
        From_Time: String,
        To_Time: String
    }],
    Wednesday_Available: { type: Boolean, default: true },
    Wednesday_Timings: [{
        From_Time: String,
        To_Time: String
    }],
    Thursday_Available: { type: Boolean, default: true },
    Thursday_Timings: [{
        From_Time: String,
        To_Time: String
    }],
    Friday_Available: { type: Boolean, default: true },
    Friday_Timings: [{
        From_Time: String,
        To_Time: String
    }],
    Saturday_Available: { type: Boolean, default: true },
    Saturday_Timings: [{
        From_Time: String,
        To_Time: String
    }],
    Sunday_Available: { type: Boolean, default: true },
    Sunday_Timings: [{
        From_Time: String,
        To_Time: String
    }],
    Today_Working: { type: Boolean, default: true },
    Today_Timings: [{
        From_Time: Date,
        To_Time: Date
    }],
    Status: { type: Boolean, default: true },
    Branch_Approval_Accepted: { type: Boolean, default: true },
    AdminData: [{
        StoreAdminID: String
    }],
    created_at: { type: Date },
    updated_at: { type: Date }
}, { collection: 'Store_Branch' });
Store_Branch.index({ Point: '2dsphere' });
module.exports = mongoose.model('Store_Branch', Store_Branch);