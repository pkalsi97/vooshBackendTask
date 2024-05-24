const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateWithToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).send({ message: "Invalid token." });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).send({ message: "Invalid token." });
    }
};

module.exports = authenticateWithToken;
