const Images = require("../model/images");

const uploadPicture = async (req, userId) => {
    try {
        if (!req.file) {
            return null;
        }
        const buffer = Buffer.from(req.file.buffer).toString('base64');
        const imageType = req.file.mimetype;
        const image = `data:${imageType};base64,${buffer}`;

        const newImage = new Images({
            userId: userId,
            fileName: req.file.originalname,
            imageData: image
        });
        const savedImage = await newImage.save();
        return savedImage._id;
    } catch (err) {
        return null;
    }
};

module.exports = uploadPicture;




