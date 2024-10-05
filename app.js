const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle dynamic subdomains
app.use((req, res, next) => {
    const host = req.headers.host; // Get the host from the request
    const subdomain = host.split('.')[0]; // Extract the subdomain
    req.subdomain = subdomain; // Store the subdomain in the request object
    next();
});

// Serve static files (like your HTML pages)
app.use(express.static('public')); // Assume your HTML files are in a 'public' folder

// Route for the user profile
app.get('/', async (req, res) => {
    const username = req.subdomain; // Get the username from the subdomain
    const userProfile = await getUserProfile(username); // Fetch user profile from your database
    if (userProfile) {
        res.send(`
            <h1>${userProfile.username}'s Profile</h1>
            <p>Badges: ${userProfile.badges.join(', ')}</p>
            <p>Links: ${userProfile.socialLinks.join(', ')}</p>
            <!-- Additional profile data -->
        `);
    } else {
        res.status(404).send('Profile not found');
    }
});

// Simulated function for fetching user profiles (replace with actual DB logic)
async function getUserProfile(username) {
    const users = {
        'john': { username: 'john', badges: ['Badge1', 'Badge2'], socialLinks: ['Twitter', 'Instagram'] },
        'jane': { username: 'jane', badges: ['Badge3'], socialLinks: ['Facebook', 'LinkedIn'] }
    };
    return users[username] || null;
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
