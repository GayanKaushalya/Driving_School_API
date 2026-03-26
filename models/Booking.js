const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    // The student making the booking (Linked to the User database)
    student: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    // The instructor teaching the lesson (Linked to the User database)
    instructor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    date: { 
        type: String, 
        required: true // Example: "2026-04-10"
    },
    timeSlot: { 
        type: String, 
        required: true // Example: "10:00 AM - 11:00 AM"
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'Cancelled'], 
        default: 'Pending' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);