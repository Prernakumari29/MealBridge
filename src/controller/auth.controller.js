const UserModel = require("../models/user.model");
const { registerService, loginService } = require("../services/authService");
const apiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const registerController = asyncHandler(async(req,res)=>{

    let {user , accessToken , refreshToken} = await registerService(req.body) 

    res.cookie("accessToken" , accessToken , {
        httpOnly:true,
        sameSite:"lax",
        secure:false,
        maxAge:15*60*1000
    })

    res.cookie("refreshToken" , refreshToken , {
        httpOnly:true,
        sameSite:"lax",
        secure:false,
        maxAge:24*60*60*1000
    })

    return res
    .status(201)
    .json(new apiResponse("user created succesfully" , user))
})

const loginController = asyncHandler(async(req , res)=>{
    let {isExisted , refreshToken , accessToken} = await loginService(req.body)

    res.cookie("accessToken" , accessToken , {
        httpOnly:true,
        sameSite:"lax",
        secure:false,
        maxAge:15*60*1000
    })
     res.cookie("refreshToken" , refreshToken , {
        httpOnly:true,
        sameSite:"lax",
        secure:false,
        maxAge:24*60*60*1000
    })
    return res
    .status(200)
    .json(new apiResponse("Succesfully Logged In" , isExisted))
})

const logoutCOntroller = asyncHandler(async(req, res)=>{
    await UserModel.findByIdAndUpdate(req.user.id , {refreshToken:null})

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res
    .status(200)
    .json( new apiResponse("user logOut successfully"));

})



module.exports = {registerController , loginController , logoutCOntroller};