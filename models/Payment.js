const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    // The booking this payment is for
    booking: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Booking', 
        required: true 
    },
    // The student paying
    student: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Completed', 'Failed'], 
        default: 'Completed' // We will assume payments succeed for this simulation
    },
    paymentMethod: {
        type: String,
        default: 'Cash'
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);