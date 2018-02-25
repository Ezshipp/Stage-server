var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var date = new Date();
var Offers_Used_Customers = new Schema({
    ReferenceOfferID:String,
    OfferID: String,
    OfferType:Number,
    CustomerID:String,
    DiscountPercentage:Number,
    Year:Number,
    Used:{type:Boolean,default:false},
    created_at: Date,
    updated_at: Date
},{ collection: 'Offers_Used_Customers' });
module.exports = mongoose.model('Offers_Used_Customers', Offers_Used_Customers);