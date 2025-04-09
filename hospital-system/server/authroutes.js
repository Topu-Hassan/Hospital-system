const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
    const { username, password, email, userType } = req.body;

    try {
        const userExist = await User.findOne({ username });
        if (userExist) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            userType,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ userId: user._id, userType: user.userType }, 'secretKey', { expiresIn: '1h' });

        res.status(200).json({ token, userType: user.userType });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
