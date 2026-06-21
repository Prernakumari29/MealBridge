const { availableDonationService, claimDonationService, myClaimedDonationservice, singleClaimedDonationService, receiveDonationService, cancelClaimService, viewReceivedService, searchFoodService } = require("../services/recipient.service");
const apiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const availableDonationController = asyncHandler( async(req,res)=>{
    const donation = await availableDonationService();

    return res
    .status(200)
    .json(new apiResponse("Available donation fetched succesfully" , donation))
})

const claimDonationController = asyncHandler(async(req , res)=>{
    const {donation , claimed }= await claimDonationService(req.params.id , req.user._id)

    return res
    .status(200)
    .json(new apiResponse("Donation claimed successfully" , claimed))

})

const myClaimedDonationController = asyncHandler(async(req , res)=>{
    const donation = await myClaimedDonationservice(req.user._id)

    return res
    .status(200)
    .json(new apiResponse("Claimed donations fetched successfully" , donation))
})

const singleClaimedDonationController = asyncHandler(async(req, res)=>{

    const donation = await singleClaimedDonationService(req.user._id , req.params.id )

    return res 
    .status(200)
    .json(new apiResponse("single donation fetched succesfully" , donation))
})

const receiveDonationController = asyncHandler(async(req,res)=>{
    let received = await receiveDonationService(req.params.id , req.user._id)

    return res
    .status(200)
    .json(new apiResponse("item is sucessfully received" , received))
})

const cancelClaimController = asyncHandler(async(req,res)=>{
    const cancelled = await cancelClaimService(req.params.id , req.user._id)

    return res
    .status(200)
    .json(new apiResponse("Claim cancelled successfully"));
})

const viewRecivedController = asyncHandler(async(req , res)=>{
    const found = await viewReceivedService( req.user._id)

    return res
    .status(200)
    .json(new apiResponse("Received donations fetched successfully" , found))
})

const searchFoodController = asyncHandler(async(req , res)=>{
    const foods  = await searchFoodService(req.query.foodName);

    return res
    .status(200)
    .json(new apiResponse("searched food" , foods))

})

module.exports = {
    availableDonationController,
    claimDonationController,
    myClaimedDonationController,
    singleClaimedDonationController,
    receiveDonationController,
    cancelClaimController,
    viewRecivedController,
    searchFoodController
}