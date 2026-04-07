const express = require('express');
const router = express.Router();

const { askQuestion } = require('../controllers/askController');
const auth = require('../middleware/authMiddleware');
const limiter = require('../middleware/rateLimiter');

router.post('/', auth, limiter, askQuestion);

module.exports = router;