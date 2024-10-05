// app.js
const express = require('express');
const bodyParser = require('body-parser'); // For parsing form data
const cors = require('cors'); // CORS middleware
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Middleware
app.use(cors()); // Allow CORS for all routes

// Serve static files from the "public" directory
app.use(express.static('public'));

// In-memory user storage (Replace with a database in production)
let users = {}; // For demonstration purposes

// Route to handle signup form submission
app.post('/signup', (req, res) => {
    const { username, password, confirmPassword } = req.body;

    // Simple validation (you can implement more robust checks)
    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match."); // Show an error if passwords don't match
    }

    // Save the user to your "database" (here using in-memory storage for demo)
    users[username] = { password }; // Store username and password
    res.redirect(`/${username}`); // Redirect to the user's profile or homepage
});

// Route for user profiles (dynamic)
app.get('/:username', (req, res) => {
    const username = req.params.username; // Get username from URL
    // Check if user exists
    if (!users[username]) {
        return res.status(404).send("User not found."); // Handle user not found
    }
    res.send(`
        <h1>Welcome to ${username}'s Profile</h1>
        <p>This is where you can customize your profile, view badges, and more!</p>
        <!-- Additional profile data can be displayed here -->
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
