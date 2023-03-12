const mongoose = require("mongoose");
const FriendshipSchema = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user_profiles",
        required: true
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User_profiles",
        required: true
    },
    status: {
        type: String,
        enum: ["accepted", "pending", "rejected"],
        default: "pending",
        required: true
    }
}, { timestamps: true });

const FriendShips = mongoose.model("FriendShips", FriendshipSchema);
module.exports = FriendShips;