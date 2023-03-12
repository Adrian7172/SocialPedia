const express = require("express");
const verifyToken = require("../middleware/auth");
const { getAllUser, getSearchedUsers, addFriend, getAllFriends, removeFriend, acceptRequest } = require("../controllers/user")
const router = express.Router();

/* GET */
router.get("/allusers", verifyToken, getAllUser);
router.get("/allFriends/:id", verifyToken, getAllFriends);
router.get("/search/:name", verifyToken, getSearchedUsers);

/* POST */
router.post("/addFriend", verifyToken, addFriend);

/* DELETE */
router.delete("/removeFriend", verifyToken, removeFriend);

/* PATCH */
router.patch("/acceptRequest", verifyToken, acceptRequest)

module.exports = router


