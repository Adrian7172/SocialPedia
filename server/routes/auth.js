const express = require("express");
const { register, login } = require("../controllers/auth");
const singleUpload = require("../middleware/multer")

const router = express.Router();

// Route for handling image file uploads
router.post('/register', singleUpload, register);

/* LOGIN */
router.post("/login", login);


module.exports = router;




