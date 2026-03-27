const cron = require('node-cron');
const Booking = require('../models/Booking');
const sendEmail = require('../utils/sendEmail');

cron.schedule('* * * * *', async () => {
    console.log('⏰ [CRON JOB] Checking database for upcoming confirmed lessons...');

    try {
        // 1. Find Confirmed bookings where the reminder has NOT been sent yet
        // We use $ne: true (Not Equal to true) just in case older bookings don't have the checkbox at all
        const upcomingBookings = await Booking.find({ 
            status: 'Confirmed', 
            reminderSent: { $ne: true } 
        }).populate('student');

        if (upcomingBookings.length > 0) {
            
            for (const booking of upcomingBookings) {
                
                const message = `Hello ${booking.student.name},\n\nThis is an automated reminder for your upcoming driving lesson.\n\nDate: ${booking.date}\nTime: ${booking.timeSlot}\n\nPlease be on time. See you soon!`;

                // 2. Send the email
                await sendEmail({
                    email: booking.student.email,
                    subject: '🚗 Driving Lesson Reminder!',
                    message: message
                });

                // 3. Mark the checkbox as TRUE and save it to the database!
                booking.reminderSent = true;
                await booking.save();
                
                console.log(`🔒 Marked reminder as SENT for booking ID: ${booking._id}`);
            }

        } else {
            console.log('No new lessons require a reminder right now.');
        }

    } catch (error) {
        console.error('Error running reminder job:', error);
    }
});