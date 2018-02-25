var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Campaign_Mail_Logs = new Schema({
    CampaignID: {
        type: String, default: ""
    },
    CampaignType: {
        type: Number, default: 0
    },
    CustomerID: {
        type: String, default: ""
    },
    CustomerName: {
        type: String, default: ""
    },
    Email: { type: String, default: "" },
    MessageID: {
        type: String,
        default: ""
    },
    event: {
        type: String,
        default: ""
    },
    status: {
        type: Number, default: 0
    },
    created_at: {
        type: Date, default: Date.now()
    },
    updated_at: {
        type: Date, default: Date.now()
    }
}, { collection: 'Campaign_Mail_Logs' });
module.exports = mongoose.model('Campaign_Mail_Logs', Campaign_Mail_Logs);