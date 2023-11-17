// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../server/controllers/authController');

// Define routes and handlers
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

module.exports = router;