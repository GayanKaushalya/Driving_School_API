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
        required: true // Example: "10:00 AM - 10:20 AM"
    },
    status: { 
        type: String, 
        enum:['Pending', 'Confirmed', 'Cancelled'], 
        default: 'Pending' 
    },
    // NEW ADDITION: A checkbox to track if the reminder email was sent
    reminderSent: {
        type: Boolean,
        default: false // By default, the reminder has NOT been sent yet
    }
    
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);