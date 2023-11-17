const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

// Display the login form (HTML)
router.get('/login', (req, res) => {
    res.render('login.ejs', { title: 'Login' });
});

// Handle login form submission (POST)
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirect on successful login
    failureRedirect: '/login', // Redirect on failed login
    failureFlash: true, // Enable flash messages for failed login
}));

module.exports = router;