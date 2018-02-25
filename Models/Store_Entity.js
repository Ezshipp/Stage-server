var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Store_Entity = new Schema({
    EntityID: { type: String },
    Store_Entity_Name: { type: String },
    Website: { type: String },
    Description: { type: String },
    Status: { type: Boolean, default: true },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { collection: 'Store_Entity' });
module.exports = mongoose.model('Store_Entity', Store_Entity);