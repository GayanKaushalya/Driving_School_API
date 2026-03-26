const express = require('express');
const router = express.Router();
const { createBooking } = require('../controllers/bookingController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Route: POST /api/bookings
// Security: Must be logged in (protect) AND must be a Student (authorize)
router.post('/', protect, authorize('Student'), createBooking);

module.exports = router;