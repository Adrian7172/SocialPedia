const Images = require("../model/Images");
const fs = require("fs");
const user_profiles = require("../model/user_profiles");
const path = require("path");

const uploadPicture = async (req, res) => {
    try {
        const userId = req.body.userId;
        // check if user exist
        const user = await user_profiles.findOne({ userId: userId });
        if (user != null) {
            res.status(400).json({ error: "user already exist!" });
        }
        else {
            const image = new Images({
                userId: userId,
                fileName: req.file.originalname,
                imageData: {
                    data: fs.readFileSync(path.join("assets", req.file.filename)),
                    contentType: req.file.mimetype,
                }
            });
            const response = await image.save();
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = uploadPicture;




