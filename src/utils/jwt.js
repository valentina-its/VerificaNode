const jwt = require('jsonwebtoken');
const config = require('../config');

function signToken(userId, options = { expiresIn: '7d' }) {
    return jwt.sign({ userId }, config.jwtSecret, options);
}

function verifyToken(token) {
    return jwt.verify(token, config.jwtSecret);
}

module.exports = { signToken, verifyToken };