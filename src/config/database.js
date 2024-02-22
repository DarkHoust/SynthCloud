const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://darkhost:123@aitu.c93ubxo.mongodb.net/synthcloud');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit();
    }
};

module.exports = connectMongoDB;