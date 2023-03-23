const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_profiles',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'parentType',
        required: true
    },
    parentType: {
        type: String,
        enum: ["user_posts", "Comments"],
        required: true
    }
}, { timestamps: true });

const Comments = mongoose.model("Comments", CommentsSchema);
module.exports = Comments;