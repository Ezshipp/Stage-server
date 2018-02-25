var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Offers_Percentage = new Schema({
    OfferID: String,
    DiscountPercentage:Number,
    created_at: Date,
    updated_at: Date
},{ collection: 'Offers_Percentage' });
module.exports = mongoose.model('Offers_Percentage', Offers_Percentage);