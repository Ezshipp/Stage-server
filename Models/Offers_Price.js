var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Offers_Price = new Schema({
    OfferID: String,
    DiscountPercentage:Number,
    created_at: Date,
    updated_at: Date
},{ collection: 'Offers_Price' });
module.exports = mongoose.model('Offers_Price', Offers_Price);