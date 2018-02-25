var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MSG91DATA = new Schema({
    requestId: {
        type: String,
        default: ""
    },
    senderId: {
        type: String,
        default: ""
    },
    PhoneNumber: { type: String, default: "" },
    Description: {
        type: String, default: ""
    },
    status: { type: String, default: "0" },
    date: { type: String, default: "" }    
}, { collection: 'MSG91DATA' });
module.exports = mongoose.model('MSG91DATA', MSG91DATA);