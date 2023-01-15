const user_profiles = require("../model/user_profiles");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


/* REGISTER */
const register = async (req, res) => {
        try {
                const {
                        firstName,
                        lastName,
                        userId,
                        password,
                        dateOfBirth,
                        gender
                } = req.body;

                // check if user exist
                const user = await user_profiles.findOne({ userId: userId });
                if (user != null) {
                        res.status(400).json({ error: "user already exist!" });
                }
                else {
                        const salt = await bcrypt.genSalt();
                        const passwordHashCode = await bcrypt.hash(password, salt);

                        const newUser = new user_profiles({
                                firstName: firstName,
                                lastName: lastName,
                                userId: userId,
                                password: passwordHashCode,
                                dateOfBirth: dateOfBirth,
                                gender: gender
                        })

                        const savedUser = await newUser.save();
                        res.status(201).json(savedUser);
                }
        } catch (error) {
                res.status(500).json({ error: error.message })
        }
}


/* LOGIN */
const login = async (req, res) => {
        try {
                const { userId, password } = req.body;

                // check valid userId
                if (!userId.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) && !userId.match(/^[0-9]{10}$/)) {
                        res.status(400).json({ data: "Invalid credential" })
                }

                const user = await user_profiles.findOne({ userId: userId });
                if (!user) res.status(400).json({ data: "User doesn't exist..!" })

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) res.status(400).json({ data: "Wrong password" })

                const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET_CODE);
                //delete password
                user.password = "null";
                res.status(200).json({ token, user })

        } catch (error) {
                res.status(500).json({ error: error.message })
        }
}



module.exports = { register, login }