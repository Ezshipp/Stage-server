var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ZONES = new Schema({
    city: String,
    city_id: String,
    title: String,
    polygonProps: {
        paths: [{
            lat: Number,
            lng: Number
        }],
        strokeColor: String,
        strokeOpacity: Number,
        strokeWeight: Number,
        fillColor: String,
        fillOpacity: Number,
        draggable: Boolean,
        editable: Boolean,
        visible: Boolean
    },
    polygons: {
        type: {
            type: String,
            enum: [
                "Point",
                "Polygon"
            ],
            default: "Point"
        },
        coordinates: { type: [[[Number]]], default: [] },
    },
    zoneseq: Number,
    pricing: [{
        id: String,
        instant: String,
        hrdelivery: String,
        samedaydelivery: String
    }]
}, { collection: 'zones' });
ZONES.index({ coordinates: '2dsphere' });
ZONES.index({ polygons: '2dsphere' });
module.exports = mongoose.model('zones', ZONES);