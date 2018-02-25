var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var operators = new Schema({
    operator_name: {
        type: String,
        default: ''
    },
    operator_address: {
        type: String,
        default: ''
    },
    manager_name: {
        type: String,
        default: ''
    },
    operator_phone: {
        type: String,
        default: ''
    },
    operator_email: {
        type: String,
        default: ''
    },
    operator_password: {
        type: String,
        default: ''
    },
    prolist: [{
        drivid: String
    }],
}, {
    collection: 'operators'
});
module.exports = mongoose.model('operators', operators);