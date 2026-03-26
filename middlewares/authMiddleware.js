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

// The "VIP Manager" to check if the user has the right role
const authorize = (...roles) => {
    return (req, res, next) => {
        // req.user is set by the "protect" bouncer before it gets here
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Error: User role '${req.user.role}' is not authorized to access this route.` 
            });
        }
        // If they have the right role, open the door!
        next();
    };
};

module.exports = { protect, authorize };