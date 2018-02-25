var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var API_DOCUMENT = new Schema({
    API_ID: { type: String, default: "" },
    API_Name: { type: String, default: "" },
    API_Description: { type: String, default: "" },
     CategoryID: { type: String, default: "" },
    CategoryName: { type: String, default: "" },
    Api_Method: { type: String, default: "" },
    Api_URL: { type: String, default: "" },
    Api_Path: { type: String, default: "" },
    Api_Parameters: [{
        Param: { type: String, default: "" },
        Datatype: { type: String, default: "" },
        Description: { type: String, default: "" }
    }],
    Api_Request_Body: {
        Request_JSON: {},
        Content_Type: { type: String, default: "" },
        Request_Description: { type: String, default: "" }
    },
    Success_Response: {
        Response: {},
        Description: { type: String, default: "" }
    },
    Error_Response: {
        Response: {},
        Description: { type: String, default: "" },
        Error_Message_Status_Body: [{
            msg: { type: Number, default: 1 },
            Status: { type: String, default: "" }
        }]
    },
    Status: { type: Boolean, default: true },
    created_at: { type: Date },
    updated_at: { type: Date }
}, { collection: 'API_DOCUMENT' });
module.exports = mongoose.model('API_DOCUMENT', API_DOCUMENT);