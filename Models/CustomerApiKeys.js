var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CustomerApiKeys = new Schema({
    ApiKey: { type: String, default: "" },
    CustomerID: { type: String, default: "" },
    customerName: { type: String, default: "" },
    customerPhone: { type: String, default: "" },
    customerEmail: { type: String, default: "" },
    Status: { type: Boolean, default: true },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { collection: 'CustomerApiKeys' });
module.exports = mongoose.model('CustomerApiKeys', CustomerApiKeys);