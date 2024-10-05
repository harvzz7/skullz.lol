const express = require('express');
const bodyParser = require('body-parser'); // For parsing form data
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route to handle signup form submission
app.post('/signup', (req, res) => {
    const { username, password, confirmPassword } = req.body;

    // Simple validation (you can implement more robust checks)
    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match."); // Show an error if passwords don't match
    }

    // Here, you would typically save the user to your database
    // For demonstration, we just redirect to the user's profile page
    res.redirect(`/${username}`); // Redirect to the user's profile or homepage
});

// Dynamic route for user profiles and homepage
app.get('*', (req, res) => {
    const host = req.headers.host; // e.g., username.skullz.lol
    const subdomain = host.split('.')[0]; // Extract the subdomain
    if (subdomain !== 'www' && subdomain !== 'skullz') { // Adjust as necessary
        // Serve the user's profile
        res.send(`
            <h1>Welcome to ${subdomain}'s Profile</h1>
            <p>This is where you can customize your profile, view badges, and more!</p>
        `);
    } else {
        res.send(`
            <h1>Welcome to Skullz.lol!</h1>
            <p>Your one-stop site for all things skullz!</p>
        `);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
