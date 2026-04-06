const express = require('express');
const router = express.Router();

const { getDocs } = require('../controllers/docController')

router.get('/', getDocs);

module.exports = router;