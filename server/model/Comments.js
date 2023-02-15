const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_profiles',
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'parentType',
        required: true
    },
    parentType: {
        type: mongoose.Schema.Types.ObjectId,
        enum: ["User_posts", "Comments"]
    }
}, { timestamps: true });

const Comments = mongoose.Model("Comments", CommentsSchema);
module.exports = Comments;