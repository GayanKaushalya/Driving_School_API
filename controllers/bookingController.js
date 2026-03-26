const Booking = require('../models/Booking');

// Function for a Student to create a booking
const createBooking = async (req, res) => {
    try {
        const { instructorId, date, timeSlot } = req.body;
        
        // The student's ID comes automatically from their token (thanks to our Bouncer!)
        const studentId = req.user.id; 

        // 1. SLOT VALIDATION: Check if this exact slot is already taken
        const existingBooking = await Booking.findOne({ 
            instructor: instructorId, 
            date: date, 
            timeSlot: timeSlot 
        });

        if (existingBooking) {
            return res.status(400).json({ message: "Sorry, this time slot is already booked!" });
        }

        // 2. If it is free, create the new booking
        const newBooking = await Booking.create({
            student: studentId,
            instructor: instructorId,
            date: date,
            timeSlot: timeSlot
        });

        res.status(201).json({ 
            message: "Lesson booked successfully!", 
            booking: newBooking 
        });

    } catch (error) {
        res.status(500).json({ message: "Error creating booking", error: error.message });
    }
};

module.exports = { createBooking };