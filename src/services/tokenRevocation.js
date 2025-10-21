const revoked = new Set();

function revoke(token) {
    revoked.add(token);
}

function isRevoked(token) {
    return revoked.has(token);
}

module.exports = { revoke, isRevoked };