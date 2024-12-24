const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 mins
    max: 10, // Limit each IP to 100 requests per windowMs
    // message: "Too many requests from this IP, please try again after 15 minutes.",
    handler: (req, res) => {
        return res.status(429).json({
            error: "Too many requests from this IP, please try again after 15 minutes!"
        });
    }
})

module.exports = limiter;