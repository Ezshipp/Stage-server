var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Ezshipp_Employee_Paid_Salaries = new Schema({
    SalaryPaidID: String,
    EmployeeID: String,
    Employee_Company_ID: { type: String, default: "" },
    Employee_Name: { type: String, default: "" },
    Employee_PhoneNumber: { type: String, default: "" },
    Employee_Email: { type: String, default: "" },
    Employee_Basic_Salary: { type: String, default: "" },
    Employee_PF: { type: Number, default: 0 },
    Employee_TDS: { type: Number, default: 0 },
    Employee_Loss_of_Pay: { type: Number, default: 0 },
    ExpensesAmount: { type: Number, default: 0 },    
    Total_Deductions: { type: Number, default: "" },    
    Employee_Total_Salary: { type: Number, default: "" },
    Payment_Type: { type: Number, default: 0 },
    TransactionID: { type: String, default: "" },
    Comment: { type: String, default: "" },
    Month_Number: { type: Number, default: 0 },
    Year_Number: { type: Number, default: 0 },
    PayslipNumber: Number,
    PDFLink: { type: String, default: "" },
    ProcessStage: Number,
    created_at: Date,
    updated_at: Date
}, { collection: 'Ezshipp_Employee_Paid_Salaries' });
module.exports = mongoose.model('Ezshipp_Employee_Paid_Salaries', Ezshipp_Employee_Paid_Salaries);