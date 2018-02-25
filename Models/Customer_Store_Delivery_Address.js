var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Customer_Store_Delivery_Address = new Schema({
    AddressID: { type: String },
    CustomerID: { type: String, default: "" },
    Name: { type: String, default: "" },
    PhoneNumber: { type: String, default: "" },
    FlatDetails: { type: String, default: "" },
    Landmark: { type: String, default: "" },    
    Address: { type: String, default: "" },
    Latitude: Number,
    Longitude: Number,
    Point: {
        type: [Number],
        index: '2d'
    },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { collection: 'Customer_Store_Delivery_Address' });
Customer_Store_Delivery_Address.index({ Point: '2dsphere' });
module.exports = mongoose.model('Customer_Store_Delivery_Address', Customer_Store_Delivery_Address);