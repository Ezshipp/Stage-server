var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SMS_Promotional_Campaign = new Schema({
    CampaignID: {
        type: String, default: ""
    },
    CampaignName: {
        type: String, default: ""
    },
    CampaignType: {
        type: Number, default: 1   // 1.Non Ordered Customer  2.Ordered Customer     3.All Customers
    },
    CampaignMessage: {
        type: String, default: ""
    },
    Message_Length: {
        type: Number, default: 0
    },
    Total_SMS: {
        type: Number, default: 0
    },
    Total_Delivered: {
        type: Number, default: 0
    },
    Total_Awaited_Delivery: {
        type: Number, default: 0
    },
    Total_Failed: {
        type: Number, default: 0
    },
    Status: {
        type: Boolean, default: true
    },
    created_at: Date,
    updated_at: Date
}, { collection: 'SMS_Promotional_Campaign' });
module.exports = mongoose.model('SMS_Promotional_Campaign', SMS_Promotional_Campaign);