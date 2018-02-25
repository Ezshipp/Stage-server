var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Store_Products = new Schema({
    ProductID: { type: String },
    ProductName: { type: String, default: "" },
    ProductDescription: { type: String, default: "" },
    Product_Addon_Available: { type: Boolean, default: false },
    Product_AddonId: { type: String, default: "" }, 
    Product_Addons: { type: Array, default: [] },
    Avaiable_Quantity: { type: Number, default: 0 },
    BranchID: { type: String },
    Branch_Name: { type: String },
    CategoryID: { type: String },
    CategoryName: { type: String, default: "" },
    Level2CategoryAvailable: { type: Boolean, default: false },
    Level2CategoryID: { type: String, default: "" },
    Level2CategoryName: { type: String, default: "" },
    Level3CategoryAvailable: { type: Boolean, default: false },
    Level3CategoryID: { type: String, default: "" },
    Level3CategoryName: { type: String, default: "" },
    Actual_Price: { type: String, default: "" },
    Selling_Price: { type: String, default: "" },
    OfferAvailable: { type: Boolean, default: false },
    OfferPercent: { type: Number, default: 0 },
    ImageID: { type: String, default: "" },    
    ImageURL: { type: String, default: "" },
    ProductWeight: { type: Number, default: 0 },
    Status: { type: Boolean, default: true },
    Who_Created:{type:String,default:""},
    created_at: { type: Date },
    updated_at: { type: Date }
}, { collection: 'Store_Products' });
module.exports = mongoose.model('Store_Products', Store_Products); 