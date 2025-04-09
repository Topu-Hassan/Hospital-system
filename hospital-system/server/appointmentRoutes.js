const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to view available doctors (for patients)
router.get('/doctors', async (req, res) => {
    try {
        const doctors = await User.find({ userType: 'doctor' });
        res.status(200).json(doctors);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching doctors' });
    }
});

// Admin approving or declining appointments
router.post('/approve', async (req, res) => {
    const { doctorId, patientId, action } = req.body;

    try {
        // Admin logic to approve or decline
        if (action === 'approve') {
            // Logic for approving
            res.status(200).json({ message: 'Appointment approved' });
        } else if (action === 'decline') {
            // Logic for declining
            res.status(200).json({ message: 'Appointment declined' });
        } else {
            res.status(400).json({ message: 'Invalid action' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
