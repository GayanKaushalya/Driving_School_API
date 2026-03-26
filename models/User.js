const mongoose = require('mongoose');

// 1. Create the Blueprint (Schema) for a User
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // A user must have a name
    },
    email: {
        type: String,
        required: true,
        unique: true // No two users can have the same email
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Instructor', 'Student'], // These are the only allowed roles from your PDF
        default: 'Student' // If no role is given, make them a Student by default
    }
}, { 
    timestamps: true // This automatically adds "createdAt" and "updatedAt" dates!
});

// 2. Turn the blueprint into a Model and export it
const User = mongoose.model('User', userSchema);
module.exports = User;