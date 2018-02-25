var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RequestPremiumCustomerData = new Schema({
    Body: {

    },
    ProcessStage: {
        type: Number,
        default: 0
    },
    Status: {
        type: String,
        default: ""
    },
    IP_Address: {
        type: String,
        default: ""
    }
}, { collection: 'RequestPremiumCustomerData' });
module.exports = mongoose.model('RequestPremiumCustomerData', RequestPremiumCustomerData);