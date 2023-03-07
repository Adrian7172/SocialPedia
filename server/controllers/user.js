const User_profiles = require("../model/User_profiles")

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


module.exports = { getAllUser, getSearchedUsers }