import express from 'express'
const router = express.Router();

import postCreateUser from "../controllers/registerController.js";

router.get('/', async (req, res) => {
    try {
        res.render('login', { layout: false });
    } catch (err) {
        console.error('Error rendering register page:', err);
        res.status(500).send('Server Error');
    }
});
router.post('/', postCreateUser);

export default router;