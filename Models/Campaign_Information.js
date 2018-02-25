var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Campaign_Information = new Schema({
    InformationID: {
        type: String, default: ""
    },
    Name: {
        type: String, default: ""
    },
    PhoneNumber: {
        type: String, default: ""
    },
    EmailID: {
        type: String, default: ""
    },
    Status: {
        type: Boolean, default: true
    },
    created_at: {
        type: Date, default: Date.now()
    },
    updated_at: {
        type: Date, default: Date.now()
    }
}, { collection: 'Campaign_Information' });
module.exports = mongoose.model('Campaign_Information', Campaign_Information);