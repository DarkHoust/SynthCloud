const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', async(req, res) => {
    res.render(path.join(__dirname, '..', 'public', 'pages', 'main.ejs'), {});
})

router.get('/profile', async(req, res) => {
    res.render(path.join(__dirname, '..', 'public', 'pages', 'profile.ejs'), {})
})

router.get('/admin', async(req, res) => {
    res.render(path.join(__dirname, '..', 'public', 'pages', 'admin.ejs'), {})
})

module.exports = router;