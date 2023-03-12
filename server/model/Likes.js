const mongoose = require("mongoose");
const LikesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_profiles",
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'parentType',
        required: true,
    },
    parentType: {
        type: String,
        enum: ["User_posts", "Comments"],
        required: true
    }
}, { timestamps: true });

const Likes = mongoose.model("Likes", LikesSchema);
module.exports = Likes;