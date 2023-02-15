const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    postImage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Images"
    },
    postCaption: {
        type: String,
        default: null
    },
    location: {
        type: String,
        default: null
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Likes"
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    },
}, { timestamps: true });

const User_posts = mongoose.Model("User_posts", PostSchema);
module.exports = user_posts;