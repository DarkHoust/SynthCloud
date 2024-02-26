const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require('path');
const requireAuth = require('../middlewares/requireAuth');
const User = require('../config/musicSchema');
const firebase = require('firebase/app');
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');
const Music = require('../config/musicSchema');
require('firebase/storage');

const firebaseConfig = {
    apiKey: "AIzaSyCZQXqlAcrztIIHF69NdSAakgaOaKgmlxk",
    authDomain: "aitu-ec006.firebaseapp.com",
    projectId: "aitu-ec006",
    storageBucket: "aitu-ec006.appspot.com",
    messagingSenderId: "471941820147",
    appId: "1:471941820147:web:b0c696be9eded39d8e5186",
    measurementId: "G-VJ3DC033G5"
};
firebase.initializeApp(firebaseConfig);
const upload = multer();

router.get('/upload', requireAuth, (req, res) => {
    const preferredLanguage = req.session.language || 'english';
    res.render(path.join(__dirname, '..', 'public', 'pages', 'upload.ejs'), { preferredLanguage});
});

router.post('/upload', upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'musicFile', maxCount: 1 }]), async (req, res) => {
    try {
        const { songName, description, artistName } = req.body;
        const coverFile = req.files['cover'][0];
        const musicFile = req.files['musicFile'][0];

        const storage = getStorage();
        await uploadBytesResumable(ref(storage, `${coverFile.originalname}`), coverFile.buffer);
        await uploadBytesResumable(ref(storage, `${musicFile.originalname}`), musicFile.buffer);

        const coverUrl = await getDownloadURL(ref(storage, `${coverFile.originalname}`));
        const musicUrl = await getDownloadURL(ref(storage, `${musicFile.originalname}`));
        console.log(coverUrl, musicUrl);

        let newMusic = new Music({songName: songName, artist: artistName, desciption: description, coverURL: coverUrl, musicURL: musicUrl});
        newMusic.save();

        res.status(200).redirect('/');
    } catch (error) {
        console.error('Error uploading song:', error);
        res.status(500).send('Error uploading song.');
    }
});

module.exports = router;

