import express from 'express'
const router = express.Router();

import ipadController from '../controllers/ipadController.js'

router.get('/', ipadController.index);

export default router