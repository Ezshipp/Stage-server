var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer_New_Order_Directional = new Schema({
    SequenceID: String,
    Sequence_Code: String,    
    CustomerID: String,
    CustomerName: String,
    CustomerPhone: String,
    CustomerEmailID: String,
    No_Of_Records: Number,
    No_Of_Directions: Number,
    BearingArray: [Number],
    NewOrderArray: Array,
    DirectionalOrderArray: Array,
    Status: { type: Boolean, default: true },
    created_at: Date,
    updated_at: Date
}, { collection: 'Customer_New_Order_Directional' });
module.exports = mongoose.model('Customer_New_Order_Directional', Customer_New_Order_Directional);