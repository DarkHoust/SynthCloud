const express = require('express');
const router = express.Router();
const path = require('path');
const requireAuth = require('../middlewares/requireAuth');
const User = require('../config/userSchema');
const Music = require('../config/musicSchema');



router.get('/', requireAuth, async (req, res) => {
    const preferredLanguage = req.session.language || 'english';
    const musics = await Music.find();
    res.render(path.join(__dirname, '..', 'public', 'pages', 'main.ejs'), {musicInfo: musics, preferredLanguage: preferredLanguage});
})

router.get('/profile', requireAuth, async (req, res) => {
    const preferredLanguage = req.session.language || 'english';
    res.render(path.join(__dirname, '..', 'public', 'pages', 'profile.ejs'), {userInfo: req.session.user, preferredLanguage});
})

router.get('/admin', requireAuth, async (req, res) => {
    if (req.session.user.isAdmin) {
        const users = await User.find();
        const musics = await Music.find();
        const preferredLanguage = req.session.language || 'english';
        res.render(path.join(__dirname, '..', 'public', 'pages', 'admin.ejs'), {
            userInfo: req.session.user,
            users: users,
            musics: musics,
            preferredLanguage: preferredLanguage
        });
    } else {
        res.status(403).send("Access is forbidden, you don't have admin's permission");
    }
});
module.exports = router;