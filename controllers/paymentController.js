const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

const processPayment = async (req, res) => {
    try {
        const { bookingId, amount, paymentMethod } = req.body;
        const studentId = req.user.id; // Comes from the Bouncer (protect middleware)

        // 1. Find the booking in the database
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found!" });
        }

        // 2. Security Check: Make sure the student is paying for THEIR OWN booking
        if (booking.student.toString() !== studentId) {
            return res.status(403).json({ message: "You can only pay for your own bookings!" });
        }

        // 3. Check if this booking is already paid for
        const existingPayment = await Payment.findOne({ booking: bookingId, status: 'Completed' });
        if (existingPayment) {
            return res.status(400).json({ message: "This booking is already paid for!" });
        }

        // 4. Create the Payment Record
        const payment = await Payment.create({
            booking: bookingId,
            student: studentId,
            amount: amount,
            paymentMethod: paymentMethod || 'Cash'
        });

        // 5. Update the Booking status from 'Pending' to 'Confirmed'
        booking.status = 'Confirmed';
        await booking.save();

        res.status(201).json({
            message: "Payment successful! Your booking is now Confirmed.",
            payment: payment
        });

    } catch (error) {
        res.status(500).json({ message: "Error processing payment", error: error.message });
    }
};

module.exports = { processPayment };