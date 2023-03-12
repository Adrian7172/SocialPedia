const express = require("express");
const multer = require("multer");
const { storePost, getAllPost, getUserPost, likePost, postLikeComment, removeLikePost } = require("../controllers/post");
const verifyToken = require("../middleware/auth");
const router = express.Router();

const upload = multer();

/* GET */
router.get("/allposts", verifyToken, getAllPost);
router.get("/allposts/:id", verifyToken, getUserPost);
router.get("/postLikeComment/:id", verifyToken, postLikeComment);

/* POST */
router.post("/post", verifyToken, upload.single("image"), storePost);
router.post("/likePost", verifyToken, likePost);
router.post("/removeLikePost", verifyToken, removeLikePost);


module.exports = router