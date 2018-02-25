var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Zone_Hubs = new Schema({
    ZoneID: {
        type: String, default: ""
    },
    ZoneHubID: {
        type: String, default: ""
    },
    ZoneHubName: {
        type: String, default: ""
    },
    Address: { type: String, default: "" },
    Latitude: Number,
    Longitude: Number,
    Point: {
        type: [Number],
        index: '2d'
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
}, { collection: 'Zone_Hubs' });
Zone_Hubs.index({ Point: '2dsphere' });
module.exports = mongoose.model('Zone_Hubs', Zone_Hubs);