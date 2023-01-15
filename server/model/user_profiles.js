const mongoose = require("mongoose");
const userProfileSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true,
        validate: {
            validator: function(value){
                return  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value) || /^[0-9]{10}$/.test(value);
            },
            message: "please enter a valid email or mobile number"
        }
    },
    firstName: {
        type: String,
        required: true,
        min: 2, 
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        min: 2, 
        max: 20
    },
    password:{
        type: String, 
        required: true,
        min: 5
    }, 
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String, 
        required: true,
    },
    age: {
        type: Number, 
        default: null
    },
    profilePicture: {
        type: String, 
        default: null
    },
    location: {
        type: String, 
        default: null
    },
    isUserIdVerified: {
        type: Boolean, 
        default: false
    },
    profileViewed: {
        type: Number, 
        default: 0
    },
}, {timestamps: true})


module.exports = mongoose.model("user_profiles", userProfileSchema);