const express = require("express");
const { storePost, getAllPost, getUserPost, likePost, removeLikePost, addComment, postsComments, postsLikes, commentsComments, commentsLikes, getUserLikes } = require("../controllers/post");
const verifyToken = require("../middleware/auth");
const singleUpload = require("../middleware/multer");
const router = express.Router();


/* GET */
router.get("/allposts", verifyToken, getAllPost);
router.get("/allposts/:id", verifyToken, getUserPost);
router.get("/postsComments/:id", verifyToken, postsComments);
router.get("/postsLikes/:id", verifyToken, postsLikes);
router.get("/commentsComments/:id", verifyToken, commentsComments);
router.get("/commentsLikes/:id", verifyToken, commentsLikes);
router.get("/likes/:id", verifyToken, getUserLikes);

/* POST */
router.post("/post", verifyToken, singleUpload, storePost);
router.post("/likePost", verifyToken, likePost);
router.post("/removeLikePost", verifyToken, removeLikePost);
router.post("/addComment", verifyToken, addComment);


module.exports = router