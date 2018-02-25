var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Referral_Relation = new Schema({
    RelationID:String,
    CustomerIDArray:[String],
    OfferUsed:{type:[String],default:[]},
    created_at: Date,
    updated_at: Date
},{ collection: 'Referral_Relation' }); 
module.exports   = mongoose.model('Referral_Relation', Referral_Relation);