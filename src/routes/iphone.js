const express = require('express');
const router = express.Router();
const iphoneController = require('../app/controllers/iphoneController');

router.get('/', iphoneController.index);

module.exports = router;
