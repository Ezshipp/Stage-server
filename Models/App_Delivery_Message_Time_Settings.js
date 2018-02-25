var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var App_Delivery_Message_Time_Settings = new Schema({
    SettingID: {
        type: String,
    },
    Instant_Time: {
        type: String,
        default: "07:00"
    },
    Four_Hours_Time: {
        type: String,
        default: "05:00"
    },
    Same_Day_Time: {
        type: String,
        default: "03:00"
    },
    Instant_Message: {
        type: String,
        default: "Your Parcel Will be Delivered by Next Business Day"
    },
    Four_Hours_Message: {
        type: String,
        default: "Your Parcel Will be Delivered by Next Business Day"
    },
    Same_Day_Message: {
        type: String,
        default: "Your Parcel Will be Delivered by Next Business Day"
    }
}, { collection: 'App_Delivery_Message_Time_Settings' });
module.exports = mongoose.model('App_Delivery_Message_Time_Settings', App_Delivery_Message_Time_Settings);