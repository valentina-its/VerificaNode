const express = require('express');
const rateLimit = require('express-rate-limit');
const { register, login } = require('../controllers/authController');
const config = require('../config');
const auth = require('../middleware/auth');
const { revoke } = require('../services/tokenRevocation');
const wrap = (handler) => async (req, res, next) => {
    try {
        await handler(req, res);
    } catch (err) {
        next(err);
    }
};

const router = express.Router();

router.post('/register', wrap(register));

const loginLimiter = rateLimit({
    windowMs: config.rateLimitWindowMs,
    max: config.rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many login attempts, please try again later' }
});

router.post('/login', loginLimiter, wrap(login));
router.post('/logout', auth, (req, res) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }
    revoke(token);
    return res.status(204).send();
});
module.exports = router;
