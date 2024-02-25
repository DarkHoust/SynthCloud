const express = require('express');
const router = express.Router();
const User = require('../config/userSchema');
const Music = require('../config/musicSchema');

// DELETE - certain user
router.delete('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE - certain music
router.delete('/music/:musicId', async (req, res) => {
    try {
        const musicId = req.params.musicId;
        await Music.findByIdAndDelete(musicId);
        res.json({ message: 'Music deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET - certain user
router.get('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET - certain music
router.get('/music/:musicId', async (req, res) => {
    try {
        const musicId = req.params.musicId;
        const music = await Music.findById(musicId);
        res.json(music);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET - all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET - all musics
router.get('/music', async (req, res) => {
    try {
        const musics = await Music.find();
        res.json(musics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT - update user
router.put('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { username, email, password } = req.body;
        await User.findByIdAndUpdate(userId, { username, email });
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT - update music
router.put('/music/:musicId', async (req, res) => {
    try {
        const musicId = req.params.musicId;
        const { songName, artist, description } = req.body;
        await Music.findByIdAndUpdate(musicId, { songName, artist, description });
        res.json({ message: 'Music updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
