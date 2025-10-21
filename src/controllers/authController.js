const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/User');
const { signToken } = require('../utils/jwt');
const authService = require('../services/authServices');

async function register(req, res) {
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ message: 'Invalid input format' });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const cleanEmail = validator.normalizeEmail(email);
    if (!cleanEmail || !validator.isEmail(cleanEmail)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 8 || password.length > 128) {
        return res.status(400).json({ message: 'Password must be 8-128 characters' });
    }

    // Requisiti di complessità: almeno una maiuscola, un numero e un carattere speciale (non spazi)
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9\s]/.test(password);
    if (!hasUpper || !hasNumber || !hasSpecial) {
        return res.status(400).json({ message: 'Password must include uppercase letter, number and special character' });
    }

    const exists = await authService.findUserByEmail(cleanEmail);
    if (exists) {
        return res.status(409).json({ message: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await authService.createUser(cleanEmail, hashed);

    const token = signToken(user._id);
    return res.status(201).json({ token });
}

async function login(req, res) {
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ message: 'Invalid input format' });
    }

    const cleanEmail = validator.normalizeEmail(email);
    if (!cleanEmail || !validator.isEmail(cleanEmail)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const user = await authService.findUserByEmail(cleanEmail, true);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user._id);
    return res.json({ token });
}

module.exports = { register, login };