const { availableDonationService, claimDonationService, myClaimedDonationservice, singleClaimedDonationService } = require("../services/recipient.service");
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

module.exports = {
    availableDonationController,
    claimDonationController,
    myClaimedDonationController,
    singleClaimedDonationController
}