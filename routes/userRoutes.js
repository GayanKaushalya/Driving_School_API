const express = require('express');
const router = express.Router();

// Import the controller and the middleware (the bouncer)
const { getProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// Notice we put "protect" in the middle! 
// When someone visits /profile, it runs "protect" first, and if successful, runs "getProfile"
router.get('/profile', protect, getProfile);

module.exports = router;