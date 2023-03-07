const express = require("express");
const verifyToken = require("../middleware/auth");
const { getAllUser, getSearchedUsers } = require("../controllers/user")
const router = express.Router();


router.get("/allusers", verifyToken, getAllUser);
router.get("/search/:name", verifyToken, getSearchedUsers);

module.exports = router


