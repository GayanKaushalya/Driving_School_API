const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // This tells Mongoose to connect using the secret URI from your .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`MongoDB Connected successfully!`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Stop the app if it fails to connect
    }
};

module.exports = connectDB;