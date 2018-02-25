var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promotional_Contacts = new Schema({
    ContactID: { type: String, default: "" },
    Name: { type: String, default: "" },
    PhoneNumber: { type: String, default: "" },
    EmailID: { type: String, default: "" }
}, { collection: 'Promotional_Contacts' });
module.exports = mongoose.model('Promotional_Contacts', Promotional_Contacts);