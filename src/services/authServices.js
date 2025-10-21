const User = require('../models/User');

async function findUserByEmail(email, includePassword = false) {
    const query = User.findOne({ email });
    return includePassword ? query.select('+password') : query;
}

async function createUser(email, hashedPassword) {
    return User.create({ email, password: hashedPassword });
}

module.exports = {
    findUserByEmail,
    createUser
};