var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Store_Products_Addons = new Schema({
    BranchID: { type: String },
    Product_AddonId: { type: String, default: "" },
    Product_Addons: { type: Array, default: [] },
    Status: { type: Boolean, default: true },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { collection: 'Store_Products_Addons' });
module.exports = mongoose.model('Store_Products_Addons', Store_Products_Addons);