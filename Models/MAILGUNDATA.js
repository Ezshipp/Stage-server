var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MAILGUNDATA = new Schema({
    MessageID: {
        type: String,
        default: ""
    },
    event: {
        type: String,
        default: ""
    },
    Email: { type: String, default: "" },
    Description: {
        type: String, default: ""
    }
}, { collection: 'MAILGUNDATA' });
module.exports = mongoose.model('MAILGUNDATA', MAILGUNDATA);