const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: {type: String, required: true},
    desc: String,
    likes: [],
    comments: [],
    image: String,
}, {timestamps: true})

const PostsModal = mongoose.model('Posts', postSchema)

module.exports = PostsModal;