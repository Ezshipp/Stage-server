var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Zone_Areas = new Schema({
    ZoneID: {
        type: String, default: ""
    },
    AreaID: {
        type: String, default: ""
    },
    AreaName: {
        type: String, default: ""
    },
    created_at: {
        type: Date, default: Date.now()
    },
    updated_at: {
        type: Date, default: Date.now()
    }
}, { collection: 'Zone_Areas' });
module.exports = mongoose.model('Zone_Areas', Zone_Areas);