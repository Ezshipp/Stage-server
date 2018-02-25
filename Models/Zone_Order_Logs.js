var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Zone_Order_Logs = new Schema({
    barcodeid: { type: String, default: "" },    
    ZoneID: {
        type: String, default: ""
    },
    ZoneName: {
        type: String, default: ""
    },
    ZoneHubID: {
        type: String, default: ""
    },
    ZoneHubName: {
        type: String, default: ""
    },
    orderId: {
        type: String, default: ""
    },
    orderseqId: {
        type: String, default: ""
    },
    DriverID: { type: String, default: "" },
    DriverName: { type: String, default: "" },
    Zone_Order_Accepted_Time: {
        type: Date, default: Date.now()
    },
    Zone_Order_Picked_Time: {
        type: Date, default: Date.now()
    },
    Shipping_Distance: { type: Number, default: 0 },
    Depo_Journey_Time: { type: String, default: '' },
    ZoneStatus: { type: Number, default: 1 },//1. dropped Zone    //2. New Driver Accepted Order    //3. New Driver Picked the Order
    created_at: {
        type: Date, default: Date.now()
    },
    updated_at: {
        type: Date, default: Date.now()
    }
}, { collection: 'Zone_Order_Logs' });
module.exports = mongoose.model('Zone_Order_Logs', Zone_Order_Logs);

