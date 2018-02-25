var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Country = new Schema({
    name:String,
    Country_code:String,
    cities:{type:[String]}
},{ collection: 'Country' });
module.exports = mongoose.model('Country', Country);