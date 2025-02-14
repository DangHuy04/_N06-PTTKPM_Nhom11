import express from 'express'
const router = express.Router();

import authLogin from '../controllers/loginController.js';

router.post('/', authLogin);

export default router;