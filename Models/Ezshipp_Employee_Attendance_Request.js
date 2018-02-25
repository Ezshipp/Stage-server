var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Ezshipp_Employee_Attendance_Request = new Schema({
    RequestID: { type: String, default: "" },
    EmployeeID: { type: String, default: "" },
    Ezshipp_BranchID: { type: String, default: "" },
    Ezshipp_Branch_Name: { type: String, default: "" },
    Employee_Role: Number,//1.Driver  2.Employee
    DriverID: { type: String, default: 0 },
    Employee_Company_ID: { type: String, default: "" },
    Employee_Name: { type: String, default: "" },
    Employee_PhoneNumber: { type: String, default: "" },
    Employee_Email: { type: String, default: "" },
    LeaveType: { type: Number, default: 1 },//1.Single Day , 2.Multiple Day
    Request_From: { type: Date, default: Date.now() },
    Request_To: { type: Date, default: Date.now() },
    Request_Description: { type: String, default: "" },
    Request_Status: { type: Number, default: 1 },//1.Initiated , 2.Approved  , 3.Rejected
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() }
}, { collection: 'Ezshipp_Employee_Attendance_Request' });
module.exports = mongoose.model('Ezshipp_Employee_Attendance_Request', Ezshipp_Employee_Attendance_Request);