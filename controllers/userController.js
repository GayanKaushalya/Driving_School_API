// Function to get the logged-in user's profile
const getProfile = async (req, res) => {
    // Because the user passed through our "protect" middleware, 
    // their data is already safely stored in req.user!
    res.status(200).json({
        message: "Profile data fetched successfully!",
        user: req.user
    });
};

module.exports = { getProfile };