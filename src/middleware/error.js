function notFound(req, res, next) {
    res.status(404).json({ message: 'Resource not found' });
}

function errorHandler(err, req, res, next) {
    console.error(err);
    if (res.headersSent) {
        return next(err);
    }
    const status = err.status || 500;
    const isProd = process.env.NODE_ENV === 'production';
    const payload = {
        message: err.message || 'Internal server error'
    };
    if (!isProd && err.stack) {
        payload.stack = err.stack;
    }
    return res.status(status).json(payload);
}

module.exports = { notFound, errorHandler };