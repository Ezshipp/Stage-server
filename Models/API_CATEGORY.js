var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var API_CATEGORY = new Schema({
    CategoryID: { type: String, default: "" },
    CategoryName: { type: String, default: "" },
    Status: { type: Boolean, default: true },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { collection: 'API_CATEGORY' });
module.exports = mongoose.model('API_CATEGORY', API_CATEGORY);