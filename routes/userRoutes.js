const express = require('express');
const router = express.Router();

// 1. Import the controller
const { getProfile } = require('../controllers/userController');

// 2. Import BOTH middlewares on a SINGLE line (This fixes your error!)
const { protect, authorize } = require('../middlewares/authMiddleware');

// 3. Routes
router.get('/profile', protect, getProfile);

router.get('/admin-only', protect, authorize('Admin'), (req, res) => {
    res.status(200).json({ message: "Welcome to the Admin Dashboard!" });
});

module.exports = router;