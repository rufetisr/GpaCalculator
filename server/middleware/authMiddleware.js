const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {

    const token = req.header('Authorization')?.split(' ')[1];
    console.log('auth: ', token);

    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, secretKey); // decode and get payload

        req.user = verified; // to access this information directly without needing to decode the token again.
        next(); // move to next middleware or route handler
    } catch (err) {
        return res.status(400).json({ message: err });
    }
};

module.exports = authMiddleware;