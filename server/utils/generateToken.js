require('dotenv').config();
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY;


function generateToken(user) {
    const payload = {
        id: user.id,
        role: "user",
    }

    const options = {
        expiresIn: '5d'
    }

    return jwt.sign(payload, secretKey, options)
}

module.exports = generateToken;