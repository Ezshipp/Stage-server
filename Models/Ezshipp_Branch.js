var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Ezshipp_Branch = new Schema({
    Ezshipp_BranchID: { type: String },
    Ezshipp_Branch_Name: { type: String },
    Status: { type: Boolean, default: true },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { collection: 'Ezshipp_Branch' });
module.exports = mongoose.model('Ezshipp_Branch', Ezshipp_Branch);