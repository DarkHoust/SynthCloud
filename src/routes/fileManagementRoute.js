const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require('path');
require('dotenv').config();
const requireAuth = require('../middlewares/requireAuth');
const User = require('../config/musicSchema');
const firebase = require('firebase/app');
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');
const Music = require('../config/musicSchema');
require('firebase/storage');

const firebaseConfig = {
    apiKey: process.env.FB_API,
    authDomain: process.env.FB_Auth,
    projectId: process.env.FB_ProjectID,
    storageBucket: process.env.FB_StorageBucket,
    messagingSenderId: process.env.FB_messagingSenderID,
    appId: process.env.FB_AppID,
    measurementId: process.env.FB_measurementID
};
firebase.initializeApp(firebaseConfig);
const upload = multer();

router.get('/upload', requireAuth, (req, res) => {
    const preferredLanguage = req.session.language || 'english';
    res.render(path.join(__dirname, '..', 'public', 'pages', 'upload.ejs'), { preferredLanguage});
});

router.post('/upload', upload.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'musicFile', maxCount: 1 },
    { name: 'artistPhoto', maxCount: 1 },
    { name: 'modalPhoto', maxCount: 1 }
]), async (req, res) => {
    try {
        // Extract form data
        const { songName, description, artistName } = req.body;
        const coverFile = req.files['cover'][0];
        const musicFile = req.files['musicFile'][0];
        const artistPhotoFile = req.files['artistPhoto'] ? req.files['artistPhoto'][0] : null;
        const modalPhotoFile = req.files['modalPhoto'] ? req.files['modalPhoto'][0] : null;

        const storage = getStorage();
        const coverUrl = await uploadFile(storage, coverFile);
        const musicUrl = await uploadFile(storage, musicFile);
        const artistPhotoUrl = artistPhotoFile ? await uploadFile(storage, artistPhotoFile) : null;
        const modalPhotoUrl = modalPhotoFile ? await uploadFile(storage, modalPhotoFile) : null;

        const newMusic = new Music({
            songName: songName,
            artist: artistName,
            desciption: description,
            coverURL: coverUrl,
            musicURL: musicUrl,
            artistPhotoURL: artistPhotoUrl,
            modalPhotoURL: modalPhotoUrl
        });
        await newMusic.save();

        res.status(200).redirect('/');
    } catch (error) {
        console.error('Error uploading song:', error);
        res.status(500).send('Error uploading song.');
    }
});

async function uploadFile(storage, file) {
    const storageRef = ref(storage, file.originalname);
    await uploadBytesResumable(storageRef, file.buffer);
    return getDownloadURL(storageRef);
}

module.exports = router;

