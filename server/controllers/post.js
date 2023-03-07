
const Images = require("../model/Images");
const { User_posts, Post_images } = require("../model/User_posts");
const User_profiles = require("../model/User_profiles");
const uploadPicture = require("./uploadPicture");



const storePost = async (req, res) => {
    try {
        const { userId, caption, location } = req.body;
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }

        const picture = await uploadPicture(req, req.user.id);
        const newPost = new User_posts({
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
                model: "User_profiles",
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
    if (!req.user) {
        res.status(403).json({ message: "Please login to create a post." });
        return;
    }
    const id = (req.params["id"]).toString();
    const allPosts = await Post_images.find().populate({
        path: "postId",
        populate: {
            path: "userId",
            model: "User_profiles",
            populate: {
                path: "profilePicture",
                model: "Images"
            }
        }
    }).populate("imageId").sort({ createdAt: -1 });

    const user = await User_profiles.findById({ _id: id }).populate("profilePicture");

    const userPost = allPosts.filter(({ postId }) => {
        return ((postId.userId._id).toString() === id);
    })
    res.status(200).json({ userPost, user });
}


module.exports = { storePost, getAllPost, getUserPost };