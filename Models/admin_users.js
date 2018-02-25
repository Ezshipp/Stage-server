var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var admin_users = new Schema({
    name: { type: String, default: '' },
    role: { type: String, default: 'Super Admin' },
    email: { type: String, default: '' },
    pass: { type: String, default: '' },
    city: { type: String, default: '0' },
    superadmin: { type: Boolean, default: true },
    Whether_God: { type: Boolean, default: false },
    ADMIN_USER_PERMISSIONS: { type: Boolean, default: false },
    HR_SALARY_PERMISSIONS: { type: Boolean, default: false },
    Status: { type: Boolean, default: true }
}, { collection: 'admin_users' });
module.exports = mongoose.model('admin_users', admin_users);