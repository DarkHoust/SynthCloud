const express = require('express');
const path = require('path');
const session = require('express-session')
const connectMongoDB = require('./config/database');
require('dotenv').config();
const app = express();
const controller = require('./routes/controller');
const authRoute = require('./routes/authRoute');
const requireAuth = require('./middlewares/requireAuth');
const fmRoute = require('./routes/fileManagementRoute');
const findLyricsRoute = require('./routes/findLyricsRoute');
const settingsRoute = require('./routes/settingsRoute');
const APIRoute = require('./routes/restAPI');

//MongoDB Connection
connectMongoDB();

//Middleware configuration
app.use(session({ secret: 'darkhost', resave: false, saveUninitialized: false}));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', controller);
app.use('/', authRoute);
app.use('/', fmRoute);
app.use('/', findLyricsRoute);
app.use('/', settingsRoute);
app.use('/api', APIRoute);


app.all("*", async (req,res) => {
    res.send("404 Not Exists")
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Local server is running on http://localhost:${PORT}/`);
});