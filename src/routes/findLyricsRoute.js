const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');
const requireAuth = require('../middlewares/requireAuth');

router.get('/lyrics', requireAuth, async (req, res) => {
    res.render(path.join(__dirname, '..', 'public', 'pages', 'lyrics.ejs'), { artist: '', track: '', lyrics: '' });
});

router.post('/lyrics', async (req, res) => {
    try {
        const { artist, track } = req.body;
        if (!artist || !track) {
            return res.status(400).send('Artist and track name are required.');
        }

        // lyrics.ovh API
        const url = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(track)}`;
        const response = await axios.get(url);
        const lyrics = response.data.lyrics;

        res.render(path.join(__dirname, '..', 'public', 'pages', 'lyrics.ejs'), { artist, track, lyrics });
    } catch (error) {
        console.error('Error fetching lyrics:', error);
        res.status(500).send('Error fetching lyrics.');
    }
});

module.exports = router;
