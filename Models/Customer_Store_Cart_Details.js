var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer_Store_Cart_Details = new Schema({
    CartID: String,
    CustomerID: { type: String, default: "" },
    BranchID: { type: String, default: "" },
    Total_Amount: { type: Number, default: "" },
    Total_Parcel_Wieght: { type: Number, default: 0 },
    Order_Placed: { type: Boolean, default: false },
    Order_Delivered: { type: Boolean, default: false },
    Status: { type: Boolean, default: true },
    created_at: Date,
    updated_at: Date
}, { collection: 'Customer_Store_Cart_Details' });
module.exports = mongoose.model('Customer_Store_Cart_Details', Customer_Store_Cart_Details);