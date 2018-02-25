var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Ezshipp_Employee_Attendance = new Schema({
    AttendanceID: { type: String, default: "" },
    Ezshipp_BranchID: { type: String, default: "" },
    Ezshipp_Branch_Name: { type: String, default: "" },
    Employee_Role: Number,
    EmployeeID: { type: String, default: "" },
    Employee_Company_ID: { type: String, default: "" },
    Employee_Name: { type: String, default: "" },
    Employee_PhoneNumber: { type: String, default: "" },
    Employee_Email: { type: String, default: "" },
    Attendance_Date: { type: Date, default: Date.now() },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() }
}, { collection: 'Ezshipp_Employee_Attendance' });
module.exports = mongoose.model('Ezshipp_Employee_Attendance', Ezshipp_Employee_Attendance);