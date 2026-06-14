const {donationServices, getMyDonationService, singleDonationService, updateDonationService, deleteDonationService, trackDonationStatusService} = require("../services/donationService")
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

const updateDonationController = asyncHandler(async(req,res)=>{
    let updatedDonation = await updateDonationService(req.params.id ,req.body, req.user._id)

    return res
    .status(200)
    .json(new apiResponse("updated succesfully" , updatedDonation))
})

const deleteDonationController = asyncHandler(async(req, res)=>{
    let deletion = await deleteDonationService(req.user._id , req.params.id);

    return res
    .status(200)
    .json(new apiResponse("deletion succesfully"))

})

const trackDonationController = asyncHandler(async(req , res)=>{
    const donation = await trackDonationStatusService(req.params.id);

    return res
    .status(200)
    .json(new apiResponse("donation status fetched successfully" , {status:donation.status}))
})


module.exports = {donationController ,
                  getMyDonationController ,
                  getSingleDonationController , 
                  updateDonationController,
                  deleteDonationController,
                  trackDonationController
                };