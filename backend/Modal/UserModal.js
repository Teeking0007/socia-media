const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    profilePicture: String,
    coverImage: String,
    about: String,
    relationship: String,
    location: String,
    handle: String,
    followers: [],
    following: []
},
{timestamps: true}
)

const UsersModal = mongoose.model('users', userSchema)

module.exports = UsersModal