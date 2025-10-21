function sanitizeObject(obj) {
    if (!obj || typeof obj !== 'object') return;
    if (Array.isArray(obj)) {
        for (const item of obj) {
            sanitizeObject(item);
        }
        return;
    }
    for (const key of Object.keys(obj)) {
        const val = obj[key];
        if (key.startsWith('$') || key.includes('.')) {
            delete obj[key];
            continue;
        }
        if (val && typeof val === 'object') {
            sanitizeObject(val);
        }
    }
}

module.exports = function sanitize(req, res, next) {
    sanitizeObject(req.body);
    sanitizeObject(req.params);
    sanitizeObject(req.query);
    next();
};