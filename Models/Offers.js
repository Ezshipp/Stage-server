var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Offers = new Schema({
    OfferID: String,
    OfferType: Number,
    OfferName: String,
    OfferDescription: String,
    OfferCode: String,
    Whether_All_Zones: Boolean,
    ZoneID: String,
    BookingType: Number,
    DiscountPercentage: Number,
    OfferValidFrom: Date,
    OfferValidTo: Date,
    isActive: { type: Boolean, default: true },
    created_at: Date,
    updated_at: Date
}, { collection: 'Offers' });
module.exports = mongoose.model('Offers', Offers);