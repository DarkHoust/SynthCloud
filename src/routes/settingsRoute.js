const express = require('express');
const router = express.Router();
const path = require('path');
const requireAuth = require('../middlewares/requireAuth')


router.get('/settings', requireAuth, async (req, res) => {
    const preferredLanguage = req.session.language || 'english';
    res.render(path.join(__dirname, '..', 'public', 'pages', 'settings.ejs'), {preferredLanguage})
})

router.post('/save-language', (req, res) => {
    const { language } = req.body;
    if (language === 'english' || language === 'russian') {
        req.session.language = language;
        res.redirect('/');
    } else {
        res.status(400).send('Invalid language choice');
    }
});

module.exports = router;
