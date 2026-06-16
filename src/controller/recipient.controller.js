const { availableDonationService, claimDonationService } = require("../services/recipient.service");
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

module.exports = {
    availableDonationController,
    claimDonationController
}