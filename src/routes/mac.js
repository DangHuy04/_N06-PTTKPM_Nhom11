const express = require('express');
const router = express.Router();
const macController = require('../app/controllers/macController');

router.get('/', macController.index);

module.exports = router;