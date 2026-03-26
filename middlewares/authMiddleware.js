const jwt = require('jsonwebtoken');
const User = require('../models/User');

// The "Bouncer" function to check for a valid token
const protect = async (req, res, next) => {
    let token;

    // 1. Check if the user sent an "Authorization" header that starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Extract the token from the header (it looks like "Bearer eyJhbG...")
            token = req.headers.authorization.split(' ')[1];

            // 3. Verify the token using your secret key from .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Find the user in the database using the ID inside the token
            // .select('-password') means "get the user data, but hide the password"
            req.user = await User.findById(decoded.id).select('-password');

            // 5. Open the door! Move to the next step
            next();
        } catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed!" });
        }
    }

    // If no token was sent at all
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token provided!" });
    }
};

module.exports = { protect };