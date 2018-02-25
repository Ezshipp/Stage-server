var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Recursive_Order_MemberShip = new Schema({
    Recursive_Order_Id:String,
    CustomerID:String,
    CustomerName:String,
    CustomerEmail:String,
    CustomerPhone: String,
    countryCode:String,
    From_Date:Date,
    To_Date:Date,
    time:Number,
    orderType:Number,
    pickAddress:String,
    dropAddress:String,
    pickLocation:{
        Longitude:Number,
        Latitude:Number
    },
    dropLocation:{
        Longitude:Number,
        Latitude:Number
    },
    itemName:String,
    itemDescription:String,
    bookingType:Number,
    receiverName:String,
    receiverPhone:String,
    paymentType:Number,
    deliverycharge:Number,
    Subscription:Boolean,
    OrderPlaced:{type:Boolean,default:false},
    created_at: Date,
    updated_at: Date
},{ collection: 'Recursive_Order_MemberShip' });
module.exports = mongoose.model('Recursive_Order_MemberShip', Recursive_Order_MemberShip);