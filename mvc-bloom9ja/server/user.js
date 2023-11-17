const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Display the registration form (HTML)
router.get('/signup.html', (req, res) => {
    res.render('register.ejs');
});

// Handle registration form submission (POST) with input validation
router.post(
    '/register', [
        body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('register.ejs', { errors: errors.array() });
        }

        try {
            const { username, email, password } = req.body;

            // Check if the email or username is already in use
            const existingUser = await User.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                return res.render('register.ejs', { error: 'User with the same email or username already exists.' });
            }

            // Hash the password using bcrypt
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create a new user and save to the database
            const user = new User({ username, email, password: hashedPassword });
            await user.save();

            // Redirect to a login page or dashboard
            res.redirect('/login');
        } catch (error) {
            // Handle registration error
            res.render('register.ejs', { error: 'Registration failed. Please try again.' });
        }
    }
);

module.exports = router;