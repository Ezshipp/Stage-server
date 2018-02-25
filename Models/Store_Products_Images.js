var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Store_Products_Images = new Schema({
    BranchID: { type: String },
    ImageID: { type: String, default: "" },
    ImageURL: { type: String, default: "" },
    Whether_Image_Used: { type: Boolean, default: false },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { collection: 'Store_Products_Images' });
module.exports = mongoose.model('Store_Products_Images', Store_Products_Images);