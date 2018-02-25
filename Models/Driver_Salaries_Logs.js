var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Driver_Salaries_Logs = new Schema({
    DriverID:String,
    Salary:{type:Number,default:0},
    created_at: Date,
    updated_at: Date
},{ collection: 'Driver_Salaries_Logs' });
module.exports = mongoose.model('Driver_Salaries_Logs', Driver_Salaries_Logs);