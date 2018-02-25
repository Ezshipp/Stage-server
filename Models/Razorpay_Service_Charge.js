var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Razorpay_Service_Charge = new Schema({
    Service_Charge: { type: Number, default: 0 }
}, { collection: 'Razorpay_Service_Charge' });
module.exports = mongoose.model('Razorpay_Service_Charge', Razorpay_Service_Charge);