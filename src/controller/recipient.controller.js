const { availableDonationService, claimDonationService, myClaimedDonationservice, singleClaimedDonationService, receiveDonationService } = require("../services/recipient.service");
const apiResponse = require("../utils/apiResponse");

const availableDonationController = async(req,res)=>{
    const donation = await availableDonationService();

    return res
    .status(200)
    .json(new apiResponse("Available donation fetched succesfully" , donation))
}

const claimDonationController = async(req , res)=>{
    const {donation , claimed }= await claimDonationService(req.params.id , req.user._id)

    return res
    .status(200)
    .json(new apiResponse("Donation claimed successfully" , claimed))

}

const myClaimedDonationController = async(req , res)=>{
    const donation = await myClaimedDonationservice(req.user._id)

    return res
    .status(200)
    .json(new apiResponse("Claimed donations fetched successfully" , donation))
}

const singleClaimedDonationController = async(req, res)=>{

    const donation = await singleClaimedDonationService(req.user._id , req.params.id )

    return res 
    .status(200)
    .json(new apiResponse("single donation fetched succesfully" , donation))
}

const receiveDonationController = async(req,res)=>{
    let received = await receiveDonationService(req.params.id , req.user._id)

    return res
    .status(200)
    .json(new apiResponse("item is sucessfully received" , received))

}

module.exports = {
    availableDonationController,
    claimDonationController,
    myClaimedDonationController,
    singleClaimedDonationController,
    receiveDonationController
}