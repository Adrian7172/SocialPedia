
const Images = require("../model/Images");
const { user_posts, Post_images } = require("../model/user_posts");
const user_profiles = require("../model/user_profiles");
const Likes = require("../model/Likes")
const Comments = require("../model/Comments")
const uploadPicture = require("./uploadPicture");



const storePost = async (req, res) => {
    try {
        const { userId, caption, location } = req.body;
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }

        const picture = await uploadPicture(req, req.user.id);
        const newPost = new user_posts({
            userId: userId,
            postCaption: caption,
            location: location,
        });
        const savedPost = await newPost.save();
        const newPostImageRelation = new Post_images({
            postId: savedPost._id,
            imageId: picture,
        });
        await newPostImageRelation.save();

        res.status(201).json({ message: "Post created successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};



const getAllPost = async (req, res) => {
    try {
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }
        const allPosts = await Post_images.find().populate({
            path: "postId",
            populate: {
                path: "userId",
                model: "user_profiles",
                populate: {
                    path: "profilePicture",
                    model: "Images"
                }
            }
        }).populate("imageId").sort({ createdAt: -1 });

        res.status(200).json(allPosts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}


const getUserPost = async (req, res) => {
    try {
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }
        const id = (req.params["id"]).toString();
        const allPosts = await Post_images.find().populate({
            path: "postId",
            populate: {
                path: "userId",
                model: "user_profiles",
                populate: {
                    path: "profilePicture",
                    model: "Images"
                }
            }
        }).populate("imageId").sort({ createdAt: -1 });

        const user = await user_profiles.findById({ _id: id }).populate("profilePicture");

        const userPost = allPosts.filter(({ postId }) => {
            return ((postId.userId._id).toString() === id);
        })
        res.status(200).json({ userPost, user });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const postLikeComment = async (req, res) => {
    try {
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }
        const id = req.params["id"];
        const likes = await Likes.find({ parent: id, parentType: "user_posts" });

        // get comments
        const comments = await Comments.find({ parent: id, parentType: "user_posts" });
        console.log(likes)

        res.status(200).json({ likes, comments })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

/* LIKE POST */
const likePost = async (req, res) => {
    try {
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }
        const {
            userId,
            postId
        } = req.body;

        const newLike = new Likes({
            userId: userId,
            parent: postId,
            parentType: "user_posts"
        })
        const response = await newLike.save();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

/* REMOVE LIKE POST */
const removeLikePost = async (req, res) => {
    try {
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }
        const {
            userId,
            postId
        } = req.body;

        const response = await Likes.deleteOne({ userId: userId, parent: postId, parentType: "user_posts" })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { storePost, getAllPost, getUserPost, likePost, postLikeComment, removeLikePost };