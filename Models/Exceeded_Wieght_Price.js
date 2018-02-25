var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Exceeded_Wieght_Price = new Schema({
    Enable_Exceeding_Weight: { type: Boolean, default: true },
    Price: { type: Number, default: 0 }
}, { collection: 'Exceeded_Wieght_Price' });
module.exports = mongoose.model('Exceeded_Wieght_Price', Exceeded_Wieght_Price);