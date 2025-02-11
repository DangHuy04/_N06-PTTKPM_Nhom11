import express from 'express';
import iphoneController from '../controllers/iphoneController.js';

const router = express.Router();

router.get('/', iphoneController.index);

export default router;
