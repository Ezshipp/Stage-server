var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer_Store_Cart_Items = new Schema({
    CartID: String,
    CustomerID: { type: String, default: "" },
    BranchID: { type: String, default: "" },
    ItemCartID: String,
    ProductID: { type: String },
    ProductName: { type: String, default: "" },
    ProductDescription: { type: String, default: "" },
    ImageURL: { type: String, default: "" },
    ProductWeight: { type: Number, default: 0 },
    Price: { type: Number, default: Number },
    Order_Placed: { type: Boolean, default: false },
    Order_Delivered: { type: Boolean, default: false },
    Status:{type:Boolean,default:true},
    created_at: Date,
    updated_at: Date
}, { collection: 'Customer_Store_Cart_Items' });
module.exports = mongoose.model('Customer_Store_Cart_Items', Customer_Store_Cart_Items);