const express = require('express');
const router = express.Router();
const path = require('path');
const requireAuth = require('../middlewares/requireAuth');
const User = require('../config/userSchema');


router.get('/', requireAuth, async(req, res) => {
    res.render(path.join(__dirname, '..', 'public', 'pages', 'main.ejs'), {});
})

router.get('/profile', requireAuth, async(req, res) => {
    res.render(path.join(__dirname, '..', 'public', 'pages', 'profile.ejs'), {userInfo: req.session.user});
})

router.get('/admin', requireAuth,  async(req, res) => {
    if (req.session.user.isAdmin){
        const users = await User.find();
        res.render(path.join(__dirname, '..', 'public', 'pages', 'admin.ejs'), {userInfo: req.session.user, users: users});
    } else {
        res.status(403).send("Access is forbidden, you don't have admin's permission");
    }
})

module.exports = router;