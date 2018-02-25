var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Offers_Lottery = new Schema({
    OfferID:String,
    CustomerID: String,
    UsedArray:[{
       Date:Date
    }],
    created_at: Date,
    updated_at: Date
},{ collection: 'Offers_Lottery' });
module.exports = mongoose.model('Offers_Lottery', Offers_Lottery);