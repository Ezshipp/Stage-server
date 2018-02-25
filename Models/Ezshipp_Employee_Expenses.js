var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Ezshipp_Employee_Expenses = new Schema({
    ExpenseID: String,
    EmployeeID: String,
    Employee_Company_ID: { type: String, default: "" },
    Employee_Name: { type: String, default: "" },
    Employee_PhoneNumber: { type: String, default: "" },
    Employee_Email: { type: String, default: "" },
    Amount: { type: String, default: "" },
    Payment_Type: { type: Number, default: 0 },
    TransactionID: { type: String, default: "" },
    Purpose_Type: { type: Number, default: 0 },
    Comment: { type: String, default: "" },
    Month_Number: { type: Number, default: 0 },
    Year_Number: { type: Number, default: 0 },
    created_at: Date,
    updated_at: Date
}, { collection: 'Ezshipp_Employee_Expenses' });
module.exports = mongoose.model('Ezshipp_Employee_Expenses', Ezshipp_Employee_Expenses);