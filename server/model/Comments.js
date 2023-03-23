const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_profiles',
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'parentType',
        required: true
    },
    parentType: {
        type: mongoose.Schema.Types.ObjectId,
        enum: ["user_posts", "Comments"]
    }
}, { timestamps: true });

const Comments = mongoose.model("Comments", CommentsSchema);
module.exports = Comments;