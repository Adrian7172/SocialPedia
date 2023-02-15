const mongoose = require('mongoose');
const ImageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_profiles'
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_posts'
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

const Images = mongoose.model("User_profiles", ImageSchema);
module.exports = Images;