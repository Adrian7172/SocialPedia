const express = require("express");
const { storePost, getAllPost, getUserPost, likePost, postLikeComment, removeLikePost, addComment, commentLikeComment } = require("../controllers/post");
const verifyToken = require("../middleware/auth");
const singleUpload = require("../middleware/multer");
const router = express.Router();


/* GET */
router.get("/allposts", verifyToken, getAllPost);
router.get("/allposts/:id", verifyToken, getUserPost);
router.get("/postLikeComment/:id", verifyToken, postLikeComment);
router.get("/commentLikeComment/:id", verifyToken, commentLikeComment);

/* POST */
router.post("/post", verifyToken, singleUpload, storePost);
router.post("/likePost", verifyToken, likePost);
router.post("/removeLikePost", verifyToken, removeLikePost);
router.post("/addComment", verifyToken, addComment);


module.exports = router