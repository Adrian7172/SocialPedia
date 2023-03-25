const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user_profiles",
        required: true
    },
    imageData: {
        publicId: {
            type: String,
            default: null,
            required: true
        },
        url: {
            type: String,
            default: null,
            required: true
        }
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




const user_posts = mongoose.model("user_posts", PostSchema);

module.exports = user_posts