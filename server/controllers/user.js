
const FriendShips = require("../model/FriendShips");
const User_profiles = require("../model/User_profiles");


/* GET ALL USERS */
const getAllUser = async (req, res) => {
    try {
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }
        const users = await User_profiles.find({}).populate("profilePicture");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


/* GET ALL FRIENDS */
const getAllFriends = async (req, res) => {
    try {
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }
        const userId = req.params["id"];
        const friends = await FriendShips.find({
            $or: [
                { user1: userId },
                { user2: userId },
            ]
        });

        res.status(200).json(friends);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

/* SEARCHED USER */
const getSearchedUsers = async (req, res) => {
    try {
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }
        let name = req.params["name"];
        name = name.trim();


        const searchedUser = await User_profiles.find({
            $or: [
                { fullName: { $regex: new RegExp(name, 'i') } },
                { bio: { $regex: new RegExp(name, 'i') } },
            ]
        }).populate("profilePicture");

        res.status(200).json(searchedUser);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


/* ADD A FRIEND*/
const addFriend = async (req, res) => {
    try {
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }
        const {
            requester, responder
        } = req.body

        const newRequest = new FriendShips({
            user1: requester,
            user2: responder,
            status: "pending"
        })

        const response = await newRequest.save();
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}



/* REMOVE A FRIEND*/
const removeFriend = async (req, res) => {
    try {
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }
        const {
            requester, responder
        } = req.body

        const response = await FriendShips.deleteOne({
            $or: [
                {
                    user1: requester, user2: responder, $or: [
                        { status: "pending" },
                        { status: "accepted" }
                    ]
                },
                {
                    user1: responder, user2: requester, $or: [
                        { status: "pending" },
                        { status: "accepted" }
                    ]
                },
            ]
        });
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}



/* ACCEPT REQUEST */
const acceptRequest = async (req, res) => {
    try {
        if (!req.user) {
            res.status(403).json({ message: "Please login to create a post." });
            return;
        }
        const {
            requester, responder
        } = req.body

        const response = await FriendShips.updateOne({
            user1: requester,
            user2: responder
        }, {
            $set: { status: "accepted" }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}



module.exports = { getAllUser, getSearchedUsers, addFriend, getAllFriends, removeFriend, acceptRequest }