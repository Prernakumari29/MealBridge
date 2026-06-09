const jwt = require("jsonwebtoken")

const generateAccessToken = (userId)=>{
   return jwt.sign({id:userId}, process.env.ACCESS_SECRET_KEY , {expiresIn:"15min"})
}

const generateRefreshToken = (userId)=>{
   return jwt.sign({id:userId} , process.env.REFRESH_SECRET_KEY , {expiresIn:"1d"})
}

module.exports = {generateAccessToken , generateRefreshToken}