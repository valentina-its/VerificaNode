const express = require('express');
const config = require('./config');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middleware/error');
const sanitize = require('./middleware/sanitize');
const logger = require('./middleware/logger');

const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: config.jsonLimit }));
app.use(sanitize);
app.use(logger);

app.use('/api', routes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use(notFound);
app.use(errorHandler);

module.exports = app;