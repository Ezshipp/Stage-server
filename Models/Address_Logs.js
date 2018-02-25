var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Address_Logs = new Schema({
    Address:{
        type:String,
        default:""
    },
    Latitude:{
        type:Number,
        default:0
    },
    Longitude:{
        type:Number,
        default:0
    }
}, { collection: 'Address_Logs' });
module.exports = mongoose.model('Address_Logs', Address_Logs);