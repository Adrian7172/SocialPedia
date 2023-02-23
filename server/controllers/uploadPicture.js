const Images = require("../model/Images");
const fs = require("fs");
const user_profiles = require("../model/user_profiles");
const path = require("path");
const { updateOne } = require("../model/Images");

const uploadPicture = async (req, res) => {
    try {
        const userId = req.body.userId;
        // check if user exist
        const user = await user_profiles.findOne({ _id: userId });
        if (user == null) {
            res.status(400).json({ message: "something went wrong!!" });
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

            if (req.body.postId == null) {
                await user_profiles.updateOne({ _id: userId },
                    {
                        $set: { profilePicture: response._id }
                    }
                )
            }
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = uploadPicture;




