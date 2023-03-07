const express = require("express");
const multer = require("multer");
const { register, login } = require("../controllers/auth");

const router = express.Router();

// Register a new user
const upload = multer();

// Route for handling image file uploads
router.post('/register', upload.single('picture'), register); 

/* LOGIN */
router.post("/login", login);


module.exports = router;




