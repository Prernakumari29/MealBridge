const {donationServices, getMyDonationService, singleDonationService} = require("../services/donationService")
const apiResponse = require("../utils/apiResponse")
const asyncHandler = require("../utils/asyncHandler")

const donationController = async(req,res)=>{

    const donation = await donationServices(req.body , req.user._id)

    return res
    .status(201)
    .json(new apiResponse ("Donation created Successfully" , donation))
}

const getMyDonationController = asyncHandler(async(req , res)=>{
    let findDonation = await getMyDonationService(req.user._id)

    return res
    .status(200)
    .json(new apiResponse("Donation fetched succesfully" , findDonation))   
})

const getSingleDonationController = asyncHandler(async(req , res)=>{
    let singleDonation = await singleDonationService(req.params.id)

    return res
    .status(200)
    .json(new apiResponse("Donation details fetched successfully" , singleDonation))

})

module.exports = {donationController , getMyDonationController , getSingleDonationController};