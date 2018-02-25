var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Ezshipp_Employee_Salaries_Logs = new Schema({
    EmployeeID: String,
    Employee_Basic_Salary: { type: Number, default: "" },
    Employee_PF: { type: Number, default: "" },
    Employee_TDS: { type: Number, default: "" },
    created_at: Date,
    updated_at: Date
}, { collection: 'Ezshipp_Employee_Salaries_Logs' });
module.exports = mongoose.model('Ezshipp_Employee_Salaries_Logs', Ezshipp_Employee_Salaries_Logs);