
const getDataUri = require("./dataUri");
const cloudinary = require("cloudinary").v2;

const uploadPicture = async (file) => {
    try {
        if (!file) {
            return null;
        }

        // Read the contents of the uploaded file into a buffer
        const path = getDataUri(file)

        const timestamp = Date.now();
        const publicId = `${timestamp}-${file.originalname}`;

        const resUrl = await cloudinary.uploader.upload(path.content, {
            public_id: publicId,
            folder: "images",
        });
        return resUrl;
    } catch (err) {
        console.error(err);
        return null;
    }
};

module.exports = uploadPicture;
