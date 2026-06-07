const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },
    role:{
        type:String,
        enum:["donor" , "recipient" , "admin"],
        required:true
    },
    
}, {timestamps:true})

const UserModel = mongoose.model("user" , userSchema)
module.exports = UserModel;