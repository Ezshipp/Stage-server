var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var First_Time_Order_Settings = new Schema({
    DiscountPercentage: { type: Number, default: 0 },
    ExpiryDate: { type: Date, default: Date.now() }
}, { collection: 'First_Time_Order_Settings' });
module.exports = mongoose.model('First_Time_Order_Settings', First_Time_Order_Settings);