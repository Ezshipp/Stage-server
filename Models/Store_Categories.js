var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Store_Categories = new Schema({
    CategoryID: { type: String },
    CategoryName: { type: String, default: "" },
    Status: { type: Boolean, default: true },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { collection: 'Store_Categories' });
module.exports = mongoose.model('Store_Categories', Store_Categories);