import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {  
    if (req.session && req.session.user) {
        return res.json({ isAuthenticated: true, user: req.session.user });
    }
    res.json({ isAuthenticated: false });
});

export default router;
