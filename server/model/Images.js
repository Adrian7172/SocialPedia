const mongoose = require('mongoose');
const ImageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_profiles",
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_posts',
        default: null
    },
    fileName: {
        type: String,
        required: true
    },
    imageData: {
        data: Buffer,
        contentType: String
    },
}, { timestamps: true })

const Images = mongoose.model("Images", ImageSchema);
module.exports = Images;