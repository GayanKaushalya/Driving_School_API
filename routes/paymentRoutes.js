const express = require('express');
const router = express.Router();
const { processPayment } = require('../controllers/paymentController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Route: POST /api/payments
// Security: Only logged-in Students can make payments
router.post('/', protect, authorize('Student'), processPayment);

module.exports = router;