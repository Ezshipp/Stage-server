var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var API_REQUESTS = new Schema({
    ApiKey: { type: String, default: "" },
    CustomerID: { type: String, default: "" },
    customerName: { type: String, default: "" },
    customerPhone: { type: String, default: "" },
    customerEmail: { type: String, default: "" },
    Body: {

    },
    Api_Type: {
        type: Number,
        default: 0
    },
    IP_Address: {
        type: String,
        default: ""
    },
    created_at: Date,
    updated_at: Date
}, { collection: 'API_REQUESTS' });
module.exports = mongoose.model('API_REQUESTS', API_REQUESTS);