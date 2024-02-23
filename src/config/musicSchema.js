const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    songName: {
        type: String,
    },
    artist: {
        type: String,
    },
    desciption: {
        type: String,
    },
    coverURL: {
        type: String,
    },
    musicURL: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

musicSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;