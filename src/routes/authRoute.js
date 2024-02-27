const express = require('express');
const router = express.Router();
const User = require('../config/userSchema');
const path = require('path');
const bcrypt = require('bcrypt');
const axios = require('axios');

router.get('/auth', async (req, res) => {
    const binaryJazzURL = 'https://binaryjazz.us/wp-json/genrenator/v1/story/';
    const response = await axios.get(binaryJazzURL);
    const musicQuotes = response.data;

    res.render(path.join(__dirname, '..', 'public', 'pages', 'login.ejs'), {quotes: musicQuotes});
})

router.post('/auth', async (req, res) => {
    const { name, password } = req.body;

    const user = await User.findOne({ username: name });

    if (user) {
        //Comparing input password with hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            req.session.user = {
                username: user.username,
                password: user.password,
                mail: user.mail,
                isAdmin: user.isAdmin
            };
            res.redirect('/');
        } else {
            res.redirect('/auth');
        }
    } else {
        res.redirect('/auth');
    }
})

router.get('/register', async (req, res) => {
    const binaryJazzURL = 'https://binaryjazz.us/wp-json/genrenator/v1/story/';
    const response = await axios.get(binaryJazzURL);
    const musicQuotes = response.data;
    res.render(path.join(__dirname, '..', 'public', 'pages', 'registration.ejs'), {quotes: musicQuotes});
})

router.post('/register', async (req, res) => {
    const {name, password, email} = req.body;

    //Encrypting password
    const encryptedPassword = await bcrypt.hash(password, 10);

    let newUser = new User({username: name, mail: email, password: encryptedPassword, isAdmin: false});
    await newUser.save();
    
    res.redirect('/auth');
})

router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.redirect('/auth');
})

module.exports = router;