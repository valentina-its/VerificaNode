module.exports = function logger(req, res, next) {
    res.on('finish', () => {
        const timestamp = new Date().toISOString();
        const action = `${req.method} ${req.originalUrl}`;
        const status = res.statusCode;
        console.log(`[${timestamp}] ${action} status=${status}`);
    });
    next();
};