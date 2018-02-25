var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer_Message_Status = new Schema({
    CampaignID: {
        type: String, default: ""
    },
    CampaignType: {
        type: Number, default: 0
    },
    CustomerID: { type: String, default: "" },
    Name: { type: String, default: "" },
    PhoneNumber: { type: String, default: "" },
    MessageResponse: {
        type: Object,
        default: {

        }
    },
    Status: { type: Number, default: 0 },
    created_at: {
        type: Date, default: Date.now()
    },
    updated_at: {
        type: Date, default: Date.now()
    }
}, { collection: 'Customer_Message_Status' });
module.exports = mongoose.model('Customer_Message_Status', Customer_Message_Status);