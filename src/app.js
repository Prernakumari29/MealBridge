const express = require("express");
const connected = require("./config/db");
const cookieParser = require("cookie-parser")
const router = require("./routes/user.routes");
const donorRouter = require("./routes/donation.routes")
const authmiddleware = require("./middleware/authmiddleware");
const app = express();
app.use(express.json())
app.use(cookieParser())
connected();

app.use("/api/auth" , router );

app.get("/home" , authmiddleware , (req,res)=>{
    res.status(200).json({
        message:"successfully entered in home",
        user:req.user
    })
})

app.use("/api/donations" , donorRouter )

module.exports = app;