var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Ezshipp_Employee = new Schema({
    Ezshipp_BranchID: { type: String, default: "" },
    Ezshipp_Branch_Name: { type: String, default: "" },
    Employee_Role: Number,
    EmployeeID: { type: String, default: "" },
    Employee_Company_ID: { type: String, default: "" },
    Employee_Name: { type: String, default: "" },
    Employee_PhoneNumber: { type: String, default: "" },
    Employee_Email: { type: String, default: "" },
    Employee_Gender: Number,
    Employee_Image_Available: { type: Boolean, default: false },
    Employee_Image_Url: { type: String, default: "" },
    Employee_DOB: { type: Date, default: Date.now },
    Employee_Address: { type: String, default: "" },
    Employee_Basic_Salary: { type: Number, default: 0 },
    Employee_PF: { type: Number, default: 0 },
    Employee_TDS: { type: Number, default: 0 },
    Employee_Date_of_Joining: { type: Date, default: Date.now },
    Bank_Account_No: { type: String, default: "" },
    Bank_Name: { type: String, default: "" },
    Bank_IFSC_No: { type: String, default: "" },
    Pan_Card_Available: {
        type: Boolean,
        default: false
    },
    Pan_Card_Image: { type: String, default: "" },
    Pan_Card_Number: { type: String, default: "" },
    Driving_License_Available: {
        type: Boolean,
        default: false
    },
    Driving_License_Image: { type: String, default: "" },
    Driving_License_Expiry_Date: { type: Date, default: Date.now },
    Address_Proof_Available: { type: Boolean, default: false },
    Address_Proof_Image: { type: String, default: "" },
    Complete_Profile_Set: {
        type: Boolean,
        default: true
    },
    Status: { type: Boolean, default: true },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { collection: 'Ezshipp_Employee' });
module.exports = mongoose.model('Ezshipp_Employee', Ezshipp_Employee);