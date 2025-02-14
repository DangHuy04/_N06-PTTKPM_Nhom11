import express from 'express'
const router = express.Router();

import postCreateUser from "../controllers/registerController.js";

router.post('/', postCreateUser);

export default router;