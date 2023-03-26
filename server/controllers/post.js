
const user_posts = require("../model/user_posts");
const user_profiles = require("../model/user_profiles");
const Likes = require("../model/Likes")
const Comments = require("../model/Comments")
const uploadPicture = require("../utils/uploadPicture");



const storePost = async (req, res) => {
    try {
        const { userId, caption, location } = req.body;
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }

        const imageUrl = await uploadPicture(req.file);
        const newPost = new user_posts({
            userId: userId,
            postCaption: caption,
            location: location,
            imageData: {
                publicId: imageUrl.public_id,
                url: imageUrl.secure_url
            }
        });
        const savedPost = await newPost.save();
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
        const allPosts = await user_posts.find({}).populate("userId").sort({ createdAt: -1 });

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
        const userPost = await user_posts.find({ userId: id }).populate("userId").sort({ createdAt: -1 });

        const user = await user_profiles.findById({ _id: id });
        res.status(200).json({ userPost, user });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

/* POST'S LIKES AND COMMENTS */
const postsComments = async (req, res) => {
    try {
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }
        const id = req.params["id"];

        // get comments
        const comments = await Comments.find({ parent: id, parentType: "user_posts" }).populate("userId");
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const postsLikes = async (req, res) => {
    try {
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }
        const id = req.params["id"];
        const likes = await Likes.find({ parent: id, parentType: "user_posts" }).populate('userId');
        res.status(200).json(likes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


/* COMMENT'S LIKES AND COMMENTS */
const commentsLikes = async (req, res) => {
    try {
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }
        const id = req.params["id"];
        const likes = await Likes.find({ parent: id, parentType: "Comments" }).populate('userId');

        res.status(200).json(likes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const commentsComments = async (req, res) => {
    try {
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }
        const id = req.params["id"];

        // get comments
        const comments = await Comments.find({ parent: id, parentType: "Comments" }).populate("userId");
        res.status(200).json(comments)
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
            parentId,
            parentType,
        } = req.body;

        const newLike = new Likes({
            userId: userId,
            parent: parentId,
            parentType: parentType
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
            parentId,
            parentType
        } = req.body;

        const response = await Likes.deleteOne({ userId: userId, parent: parentId, parentType: parentType })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


/* Add Comment */
const addComment = async (req, res) => {
    try {
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }
        const {
            userId,
            parentId,
            parentType,
            comment
        } = req.body;

        const newComment = new Comments({
            userId: userId,
            parent: parentId,
            parentType: parentType,
            comment: comment
        })
        const response = await newComment.save();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}




module.exports = { storePost, getAllPost, getUserPost, likePost, postsComments, removeLikePost, addComment, commentsComments, postsLikes, commentsLikes };