// controllers/authController.js

const bcrypt = require('bcrypt');
const { users, resetTokens } = require('../data'); // Simulated user data and reset tokens storage (replace with a database)

// ... Previous code for registration and login

// Controller function to render the password reset form
function getResetPassword(req, res) {
    res.render('reset-password.ejs');
}

// Controller function to handle password reset form submission
async function postResetPassword(req, res) {
    try {
        const { email } = req.body;

        // Generate a reset token (a unique string, replace with your own logic)
        const resetToken = generateResetToken();

        // Simulated storage of reset tokens (replace with a database)
        resetTokens.push({ email, resetToken });

        // Send an email to the user with a link to reset their password
        sendResetEmail(email, resetToken);

        res.render('reset-password-success.ejs', { message: 'Password reset instructions sent to your email.' });
    } catch (error) {
        res.render('reset-password.ejs', { error: 'Password reset failed. Please try again.' });
    }
}

// Controller function to handle password reset using the token
async function resetPasswordWithToken(req, res) {
    const { email, token } = req.params;

    // Check if the reset token is valid and not expired (replace with your own logic)
    const resetTokenExists = resetTokens.find((entry) => entry.email === email && entry.resetToken === token);

    if (resetTokenExists) {
        // Render the password reset form with a hidden field containing the token
        res.render('reset-password-form.ejs', { email, token });
    } else {
        res.render('reset-password-failed.ejs', { error: 'Invalid or expired reset token.' });
    }
}

// Controller function to handle password reset form submission with a valid token
async function postResetPasswordWithToken(req, res) {
    const { email, token, newPassword } = req.body;

    // Find the user by email (replace this with a database query)
    const user = users.find((user) => user.email === email);

    if (!user) {
        return res.render('reset-password-failed.ejs', { error: 'User not found' });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password (replace with database update)
    user.password = hashedPassword;

    // Remove the used reset token
    resetTokens.splice(
        resetTokens.findIndex((entry) => entry.email === email && entry.resetToken === token),
        1
    );

    res.render('reset-password-success.ejs', { message: 'Password reset successful.' });
}

// Controller function for logging out the user
function logout(req, res) {
    // Clear the user session or JWT token, if applicable
    // Redirect to the login page or any other desired page
    res.redirect('/login');
}

module.exports = {
    // ... Previous exports
    getResetPassword,
    postResetPassword,
    resetPasswordWithToken,
    postResetPasswordWithToken,
    logout,
};