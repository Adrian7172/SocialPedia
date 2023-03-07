const express = require("express");
const multer = require("multer");
const { storePost, getAllPost, getUserPost } = require("../controllers/post");
const verifyToken = require("../middleware/auth");
const router = express.Router();

const upload = multer();
router.post("/post", verifyToken, upload.single("image"), storePost); 
router.get("/allposts", verifyToken, getAllPost); 
router.get("/allposts/:id", verifyToken, getUserPost); 



module.exports = router