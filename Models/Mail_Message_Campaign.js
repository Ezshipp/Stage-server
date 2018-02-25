var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Mail_Message_Campaign = new Schema({
    CampaignID: {
        type: String, default: ""
    },
    CampaignType: {
        type: Number, default: 0
    },
    CampaignTitle: {
        type: String, default: ""
    },
    CampaignDescription: {
        type: String, default: ""
    },
    MessageData: {
        type: String, default: ""
    },
    MailSubject: {
        type: String, default: ""
    },
    MailData: {
        type: String, default: ""
    },
    No_of_Message_Mail_Sent: {
        type: Number, default: 0
    },
    No_of_Message_Mail_Failed: {
        type: Number, default: 0
    },
    No_of_Message_Mail_Delivered: {
        type: Number, default: 0
    },
    created_at: {
        type: Date, default: Date.now()
    },
    updated_at: {
        type: Date, default: Date.now()
    }
}, { collection: 'Mail_Message_Campaign' });
module.exports = mongoose.model('Mail_Message_Campaign', Mail_Message_Campaign);