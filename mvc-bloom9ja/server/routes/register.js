const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

// Display the registration form (HTML)
router.get('/register', (req, res) => {
    res.render('register.ejs'); // Assuming you're using EJS for views
});

// Handle registration form submission (POST)
router.post('/register', async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });

        // Save the user to the database (you should hash the password here)
        await user.save();

        // Redirect to a login page or dashboard
        res.redirect('/login');
    } catch (error) {
        // Handle registration error, e.g., duplicate email
        res.render('register.ejs', { error: 'Registration failed. Please try again.' });
    }
});

module.exports = router;