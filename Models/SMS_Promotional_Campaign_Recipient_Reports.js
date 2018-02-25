var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SMS_Promotional_Campaign_Recipient_Reports = new Schema({
    ReferenceID: {
        type: String, default: ""
    },
    CampaignID: {
        type: String, default: ""
    },
    CampaignName: {
        type: String, default: ""
    },
    customerName: {
        type: String, default: ""
    },
    customerPhone: {
        type: String, default: ""
    },
    SMS_Status: {
        type: Number, default: 1   //1.Processed  2.Awaited Delivery   3.Delivered  4.Failed
    },
    SMS_Message: {
        type: String, default: "Processed"
    },
    created_at: Date,
    updated_at: Date
}, { collection: 'SMS_Promotional_Campaign_Recipient_Reports' });
module.exports = mongoose.model('SMS_Promotional_Campaign_Recipient_Reports', SMS_Promotional_Campaign_Recipient_Reports);