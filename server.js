const express = require('express');
const cors = require('cors'); // Middleware to enable CORS
const app = express();

let status = null; // Tracks the current user who claimed the status
let startTime = null; // Tracks when the status was claimed

// Middleware to parse JSON bodies in requests
app.use(cors());
app.use(express.json());

// GET /status - Check the current status
app.get('/status', (req, res) => {
    res.json({ status: status ? "In Use" : "Available", user: status, startTime });
});

// POST /status - Claim the status
app.post('/status', (req, res) => {
    if (!status) {
        status = req.body.user || "Anonymous"; // Set the status to the user
        startTime = req.body.startTime || new Date().toISOString(); // Set the start time
        res.json({ success: true, status: "In Use", user: status, startTime });
    } else {
        res.status(400).json({ success: false, message: "Status is already claimed" });
    }
});

// DELETE /status - Release the status
app.delete('/status', (req, res) => {
    status = null; // Clear the current user
    startTime = null; // Clear the start time
    res.json({ success: true, status: "Available" });
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
