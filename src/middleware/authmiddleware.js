const UserModel = require("../models/user.model");
const apiError = require("../utils/apiError");
const jwt = require("jsonwebtoken")

const authmiddleware = async(req, res ,next)=>{
    try {
        let accessToken = req.cookies.accessToken;

    if(!accessToken){
        throw new apiError(401 , "unauthorized credetials")
        
    }

    let decode =  jwt.verify(accessToken , process.env.ACCESS_SECRET_KEY)

    let user = await UserModel.findById(decode.id)

    if(!user){
        throw new apiError(404 , "user not found")
    }

   req.user = user;
   next();
    } catch (error) {
        next(error);
    }

}

module.exports = authmiddleware;