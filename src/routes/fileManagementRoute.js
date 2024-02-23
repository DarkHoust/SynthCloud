const express = require('express');
const router = express.Router();
const multer  = require('multer');
const firebase = require('firebase/app');
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

// Initialize Firebase with the client configuration
firebase.initializeApp(firebaseConfig);

// Create a Multer instance to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Serve the upload page
router.get('/upload', (req, res) => {
    res.sendFile(__dirname, '..', 'public', 'pages', 'upload.ejs');
});

// Define a route for uploading files
router.post('/upload', upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'musicFile', maxCount: 1 }]), async (req, res) => {
    try {
        const { songName, description, artistName } = req.body;
        const coverFile = req.files['cover'][0];
        const musicFile = req.files['musicFile'][0];

        // Upload cover image and music file to Firebase Storage
        const storageRef = firebase.storage().ref();
        const coverUploadTask = storageRef.child(`covers/${coverFile.originalname}`).put(coverFile.path);
        const musicUploadTask = storageRef.child(`music/${musicFile.originalname}`).put(musicFile.path);

        // Wait for both uploads to complete
        await Promise.all([coverUploadTask, musicUploadTask]);

        // Get download URLs for the uploaded files
        const coverUrl = await coverUploadTask.snapshot.ref.getDownloadURL();
        const musicUrl = await musicUploadTask.snapshot.ref.getDownloadURL();

        // Perform any additional database operations or save URLs as needed
        // For example, you could use Firebase Realtime Database or Firestore to store the metadata

        res.status(200).send('Song uploaded successfully.');
    } catch (error) {
        console.error('Error uploading song:', error);
        res.status(500).send('Error uploading song.');
    }
});

module.exports = router;

