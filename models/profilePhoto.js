const mongoose = require('mongoose');

const ProfilePhotoSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img: 
    {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('ProfilePhoto', ProfilePhotoSchema);