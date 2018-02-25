var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Store_SubCategory_level2 = new Schema({
    CategoryID: { type: String },
    CategoryName: { type: String, default: "" },
    BranchID: { type: String },
    Branch_Name: { type: String },
    Level2CategoryID: { type: String },
    Level2CategoryName: { type: String, default: "" },
    Status: { type: Boolean, default: true },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { collection: 'Store_SubCategory_level2' });
module.exports = mongoose.model('Store_SubCategory_level2', Store_SubCategory_level2);  