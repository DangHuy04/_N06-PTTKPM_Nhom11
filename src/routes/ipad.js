const express = require('express');
const router = express.Router();
const ipadController = require('../app/controllers/ipadController');

router.get('/', ipadController.index);

module.exports = router;