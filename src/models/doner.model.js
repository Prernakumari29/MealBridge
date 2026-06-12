const mongoose = require("mongoose")

const donorSchema = new mongoose.Schema({
    foodName:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    pickUpAddress:{
        type:String,
        required:true
    },
    expiresAt:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["available","claimed","Completed"],
        default:"available"
    },
    donor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    claimedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        default:null
    }
}, {timestamps:true})

const DonorModel = mongoose.model("donor" , donorSchema)
module.exports = DonorModel;