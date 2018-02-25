var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer_Premium_Pricing = new Schema({
    CustomerID: String,
    Premium_Instant_Pricing: { type: Number, default: 0 },
    Premium_4hours_Pricing: { type: Number, default: 0 },
    Premium_Same_Day_Pricing: { type: Number, default: 0 },
     Premium_Instant_Pricing_discount: { type: Number, default: 0 },
    Premium_4hours_Pricing_discount: { type: Number, default: 0 },
    Premium_Same_Day_Pricing_discount: { type: Number, default: 0 },
    Premium_min_ordercount: { type: Number, default: 0 },
    created_at: Date,
    updated_at: Date
}, { collection: 'Customer_Premium_Pricing' });
module.exports = mongoose.model('Customer_Premium_Pricing', Customer_Premium_Pricing);