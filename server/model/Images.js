const mongoose = require('mongoose');
const ImageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    imageData: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Images = mongoose.model("Images", ImageSchema);
module.exports = Images;