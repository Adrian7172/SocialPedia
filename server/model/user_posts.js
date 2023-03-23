const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user_profiles",
        required: true
    },
    postCaption: {
        type: String,
        default: null
    },
    location: {
        type: String,
        default: null
    },
}, { timestamps: true });


// relationship between post and images
const PostImageSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user_posts",
        required: true
    },
    imageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Images",
        default: null
    },
}, { timestamps: true })


const User_posts = mongoose.model("user_posts", PostSchema);
const Post_images = mongoose.model("Post_images", PostImageSchema);

module.exports = {
    User_posts,
    Post_images
};