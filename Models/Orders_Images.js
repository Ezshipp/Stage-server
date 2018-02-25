var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Orders_Images = new Schema({
    CustomerID:String,
    ImageID:String,
    ImageURL:String,
    Used:Boolean,
    created_at: Date,
    updated_at: Date
},{ collection: 'Orders_Images' });
module.exports = mongoose.model('Orders_Images', Orders_Images);