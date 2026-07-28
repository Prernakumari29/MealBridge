const UserModel = require("../models/user.model")
const apiError = require("../utils/apiError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken")




const registerService = async(data)=>{

    let {name , email , password , mobile , role} = data
    if(!name || !email || !password || !mobile || !role){
       throw new apiError(400 , "all fields are required")
    }

    let existed = await UserModel.findOne({email})
    if(existed){
        throw new apiError(409 , "User already registered")
    }

    const hash = await bcrypt.hash(password , 10)

    const user = await UserModel.create({
        name,
        email,
        password:hash,
        mobile,
        role
    })

    let accessToken = generateAccessToken(user._id)
    let refreshToken = generateRefreshToken(user._id)

    user.refreshToken = refreshToken
    await user.save();

    return{
        user , accessToken , refreshToken
    }
}

const loginService = async(data)=>{

    let {email , password} = data;
    if(!email || !password){
        throw new apiError(400 , "all fields are required")
    }
    let isExisted = await UserModel.findOne({email})
    if(!isExisted){
        throw new apiError(404 , "User not found")
    }

    let isMatch = await bcrypt.compare(password , isExisted.password)
    if(!isMatch){
        throw new apiError(401 , "invalid email or password")
    }

    let accessToken = generateAccessToken(isExisted._id);
    let refreshToken = generateRefreshToken(isExisted._id);

    isExisted.refreshToken = refreshToken;
    await isExisted.save();

    const user = await UserModel
    .findById(isExisted._id)
    .select("-password -refreshToken")

    return{
        user , refreshToken , accessToken
    }
}

const getAccessToken = async(refreshtoken)=>{

    if(!refreshtoken){
        throw new apiError(401, "unauthorized")
    }

    const decode = jwt.verify(refreshtoken, process.env.REFRESH_SECRET_KEY)

    const user = await UserModel.findById(decode.id)

    if(!user){
        throw new apiError(404, "User not found")
    }

    if(refreshtoken !== user.refreshToken){
        throw new apiError(401,"unauthorized request") 
    }

    let accesstoken = generateAccessToken(user._id)
    return accesstoken;
}

module.exports = {registerService , loginService , getAccessToken}