var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ezshipp_Attendance = new Schema({
    AttendanceID: { type: String, default: "" },
    Total_Employee: { type: Number, default: 0 },
    No_of_Employee_Present: { type: Number, default: 0 },
    No_of_Employee_Absent: { type: Number, default: 0 },
    Attendance_Date: { type: Date, default: Date.now() },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { collection: Ezshipp_Attendance });
module.exports = mongoose.model('Ezshipp_Attendance', Ezshipp_Attendance);