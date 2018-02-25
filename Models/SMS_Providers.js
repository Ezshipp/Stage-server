var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SMS_Providers = new Schema({
    ProviderID: {
        type: String, default: ""
    },
    ProviderName: {
        type: String, default: ""
    },
    ProviderSMSBalances: {
        type: Number, default: 0
    },
    Selected_Provider: {
        type: Boolean, default: false
    },
    Service_Type: {
        type: Number, default: 1
    },
    Status: {
        type: Boolean, default: true
    },
    created_at: Date,
    updated_at: Date
}, { collection: 'SMS_Providers' });
module.exports = mongoose.model('SMS_Providers', SMS_Providers);