const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    userType: { type: String, enum: ['admin', 'doctor', 'patient'], required: true },
    specialties: [String],  // For doctors to list their specialties
});

module.exports = mongoose.model('User', userSchema);
