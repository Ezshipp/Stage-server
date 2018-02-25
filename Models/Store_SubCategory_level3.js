var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Store_SubCategory_level3 = new Schema({
    CategoryID: { type: String },
    CategoryName: { type: String, default: "" },
    Level2CategoryID: { type: String },
    Level2CategoryName: { type: String, default: "" },
    Level3CategoryID: { type: String },
    Level3CategoryName: { type: String, default: "" },
    Status: { type: Boolean, default: true },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { collection: 'Store_SubCategory_level3' });
module.exports = mongoose.model('Store_SubCategory_level3', Store_SubCategory_level3);  