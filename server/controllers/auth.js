
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uploadPicture = require("./uploadPicture");
const Images = require("../model/images");
const { User_profiles } = require("../model/user_profiles");


/* REGISTER */
const register = async (req, res) => {
        try {
                const {
                        firstName,
                        lastName,
                        userId,
                        password,
                        dateOfBirth,
                        gender,
                        bio,
                        occupation,
                        locality,
                        city,
                        state,
                        country
                } = req.body;

                // check if user exist
                const user = await User_profiles.findOne({ userId: userId });
                if (user != null) {
                        res.status(400).json({ message: "user already exist!" });
                }
                else {
                        const pictureId = await uploadPicture(req, userId);
                        const salt = await bcrypt.genSalt();
                        const passwordHashCode = await bcrypt.hash(password, salt);
                        const fullName = `${firstName} ${lastName}`;
                        const age = getAge(dateOfBirth);

                        const newUser = new User_profiles({
                                firstName: firstName,
                                lastName: lastName,
                                fullName: fullName,
                                userId: userId,
                                password: passwordHashCode,
                                dateOfBirth: dateOfBirth,
                                age: age,
                                gender: gender,
                                profilePicture: pictureId,
                                bio: bio,
                                occupation: occupation,
                                address: {
                                        locality: locality,
                                        city: city,
                                        state: state,
                                        country: country
                                }
                        })

                        const savedUser = await newUser.save();
                        res.status(201).json(savedUser);
                }
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};


/* LOGIN */
const login = async (req, res) => {
        try {
                const { userId, password } = req.body;

                // check valid userId
                if (!userId.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) && !userId.match(/^[0-9]{10}$/)) {
                        res.status(401).json({ message: "Invalid Email or phone number" })
                }

                const user = await User_profiles.findOne({ userId: userId });
                if (!user) res.status(401).json({ message: "User doesn't exist..!" })

                const isMatch = await bcrypt.compare(password, user._doc.password);
                if (!isMatch) res.status(401).json({ message: "Wrong password" })
                else {
                        let profilePic = await Images.findById({ _id: user._doc.profilePicture });
                        user._doc.profilePicture = profilePic.imageData;
                        // //delete password
                        user._doc.password = null;
                        const token = jwt.sign({ id: user._doc.userId }, process.env.JWT_SECRET_CODE);
                        res.status(200).json({ token, user: user._doc })
                }

        } catch (error) {
                res.status(500).json({ message: error.message })
        }
}

//get age 
function getAge(dateString) {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
        }
        return age;
}



module.exports = { register, login }



