app.use(express.static('public'));
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Define the port you want to run your server on

// Middleware
app.use(express.static('public')); // Serve static files from the 'public' directory

// Define routes
const authRoutes = require('./server/routes/auth'); // Import your route modules
app.use('/auth', authRoutes); // Mount routes under the '/auth' URL path

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});