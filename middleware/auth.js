// filepath: middleware/auth.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = auth;