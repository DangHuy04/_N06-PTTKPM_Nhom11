import express from 'express'
const router = express.Router();

import authLogin from '../controllers/loginController.js';

router.get('/', async (req, res) => {
    try {
        res.render('login', { layout: false });
    } catch (err) {
        console.error('Error rendering login page:', err);
        res.status(500).send('Server Error');
    }
});
router.post('/', authLogin);

export default router;

