const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function to handle user registration
const registerUser = async (req, res) => {
    try {
        // 1. Get the data the user typed in (name, email, password, role)
        const { name, email, password, role } = req.body;

        // 2. Check if a user with this email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // 3. Scramble (Hash) the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create the new user in the database
        const user = await User.create({
            name,
            email,
            password: hashedPassword, // Save the scrambled password, NOT the real one!
            role
        });

        // 5. Send a success message back
        res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Error in registration", error: error.message });
    }
};
// Function to handle user login
const loginUser = async (req, res) => {
    try {
        // 1. Get email and password from the user's request
        const { email, password } = req.body;

        // 2. Check if a user with this email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 3. Compare the typed password with the scrambled password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 4. If passwords match, create the JWT (The digital ID card)
        const token = jwt.sign(
            { id: user._id, role: user.role }, // The data we want to hide inside the token
            process.env.JWT_SECRET,            // Our secret key from .env
            { expiresIn: '1d' }                // The token expires in 1 day
        );

        // 5. Send the success message and the token back to the user
        res.status(200).json({
            message: "Login successful!",
            token: token, // Here is the ID card!
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Error in login", error: error.message });
    }
};

module.exports = { registerUser, loginUser };