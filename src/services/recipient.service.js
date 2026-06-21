const DonorModel = require("../models/doner.model");
const apiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");

const availableDonationService = async()=>{
    const donation = await DonorModel.find({status:"available"})
    return donation;
}

const claimDonationService = async(donationId , recipientId)=>{
    const donation = await DonorModel.findById(donationId );
    if(!donation){
        throw new apiError(404 , "donation not found")
    }

    if(donation.status !== "available"){
        throw new apiError(400 , "this donation is already claimed")
    }

    const activeDonation = await DonorModel.countDocuments({claimedBy:recipientId , status:"claimed"})

    if(activeDonation >= 3){
        throw new apiError(400 , "Claim limit exceeded");
    }

    const claimed = await DonorModel.findByIdAndUpdate(donationId , {status:"claimed" , claimedBy:recipientId} , {new:true}).populate("claimedBy" , "name mobile email")

    return { donation , claimed}
}

const myClaimedDonationservice = async(userId)=>{

    let donation = await DonorModel.find({claimedBy:userId})

    return donation;
}

const singleClaimedDonationService = async(userId , donationId)=>{

    const donation = await DonorModel.findById(donationId)
    if(!donation){
        throw new apiError(404 , "donation not found")
    }
    if(donation.claimedBy.toString() !== userId.toString()){
        throw new apiError(403 , "access denied")
    }
    return donation
}

const receiveDonationService = async(donationID , userID)=>{

    const donation = await DonorModel.findById(donationID)
    if(!donation){
        throw new apiError(404 , "donation notfound");
    }
    if(donation.claimedBy.toString() !== userID.toString()){
        throw new apiError(403 , "access denied")
    }
    if(donation.status !== "claimed"){
        throw new apiError(400 , "oops! item is not claimed yet")
    }

    const received = await DonorModel.findByIdAndUpdate(donationID , {status:"received"} , {new:true})
    return received
}

const cancelClaimService = async(donationId , userId)=>{

    const donation = await DonorModel.findById(donationId)
    if(!donation){
        throw new apiError(404 , "donation notfound");
    }
    if(donation.status !== "claimed"){
        throw new apiError(400 , "donation is not claimed yet")
    }

    if(donation.claimedBy.toString !== userId.toString){
        throw new apiError(403 , "access denied")
    }

    let cancelled = await DonorModel.findByIdAndUpdate(donationId , {status:"available" , claimedBy:null} , {new:true})

    return cancelled;
}

const viewReceivedService = async( userId)=>{
    

    const found = await DonorModel.find({claimedBy:userId , status:"received"})
    return found

}

const searchFoodService = async(foodName)=>{

    const foods = await DonorModel.find({
        foodName:{
            $regex:foodName,
            $options:"i"
        },
        status:"available"
    })

    return foods

}

module.exports = {
    availableDonationService,
    claimDonationService,
    myClaimedDonationservice,
    singleClaimedDonationService,
    receiveDonationService,
    cancelClaimService,
    viewReceivedService,
    searchFoodService
}