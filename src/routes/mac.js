import express from 'express';
import macController from '../controllers/macController.js';

const router = express.Router();

router.get('/', macController.index);

export default router;
