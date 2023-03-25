const express = require("express");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/userRoute")
const authRoute = require("./routes/auth.js");
const postRoute = require("./routes/postRoute");
const corsOptions = require("./config/corsOptions");

const app = express();
dotenv.config();

/*  MIDDLEWARES  */
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());


/* ROUTES */
app.use(userRoute)
app.use("/auth", authRoute);
app.use("/user", postRoute);



/* CLOUDINARY */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


/* MONGODB SETUP */
const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URL,
    {
        // support to use mongodb atlas
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        app.listen(PORT, () => console.log(`The server is running on the ${PORT}`));
    }).catch(err => console.log(err));








