var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Vendors_Price = new Schema({
    CustomerID: String,
    VendorID: String,
    Price:Number,
    created_at: Date,
    updated_at: Date
},{ collection: 'Vendors_Price' });
module.exports = mongoose.model('Vendors_Price', Vendors_Price);