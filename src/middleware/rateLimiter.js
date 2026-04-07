const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 min
    max: 10,
    keyGenerator: (req) => req.user.id // per user
});

module.exports = limiter;