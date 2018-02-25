var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Driver_Expenses = new Schema({
    ExpenseID: String,
    DriverID: String,
    Amount: { type: String, default: "" },
    Payment_Type: { type: Number, default: 0 },
    TransactionID: { type: String, default: "" },
    Purpose_Type: { type: Number, default: 0 },
    Comment:{type:String,default:""},
    created_at: Date,
    updated_at: Date
}, { collection: 'Driver_Expenses' });
module.exports = mongoose.model('Driver_Expenses', Driver_Expenses);