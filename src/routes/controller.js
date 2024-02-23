const express = require('express');
const router = express.Router();
const path = require('path');
const requireAuth = require('../middlewares/requireAuth');
const requireAdmin = require('../middlewares/requireAdmin')


router.get('/', requireAuth, async(req, res) => {
    res.render(path.join(__dirname, '..', 'public', 'pages', 'main.ejs'), {});
})

router.get('/profile', requireAuth, async(req, res) => {
    res.render(path.join(__dirname, '..', 'public', 'pages', 'profile.ejs'), {userInfo: req.session.user});
})

router.get('/admin', requireAuth,  async(req, res) => {
    if (req.session.user.isAdmin){
        res.render(path.join(__dirname, '..', 'public', 'pages', 'admin.ejs'), {userInfo: req.session.user});
    } else {
        res.status(403).send("Access is forbidden, you don't have admin's permission");
    }
})

module.exports = router;