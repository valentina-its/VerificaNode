const { verifyToken } = require('../utils/jwt');
const { isRevoked } = require('../services/tokenRevocation');

module.exports = function auth(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token missing' });
    }
    const token = header.split(' ')[1];
    if (isRevoked(token)) {
        return res.status(401).json({ message: 'Token revoked' });
    }
    try {
        const payload = verifyToken(token);
        req.userId = payload.userId;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token not valid' });
    }
}