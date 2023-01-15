const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth.js")


const app = express();
dotenv.config();

/*  MIDDLEWARES  */
app.use(cors());
app.use(express.json());


/* ROUTES */
app.use("/auth", authRoute);



/* MONGODB SETUP */
const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URL, 
    {
        // support to use mongodb atlas
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>{
        app.listen(PORT, () => console.log(`The server is running on the ${PORT}`));
    }).catch(err => console.log(err));








    