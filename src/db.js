const mongoose = require('mongoose');
const config = require('./config');

function connectDB() {
    mongoose.set('strictQuery', true);
    mongoose.set('sanitizeFilter', true);

    return mongoose
        .connect(config.mongoUri)
        .then(() => console.log('MongoDB connected'))
        .catch((err) => {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        });
}

module.exports = { connectDB };