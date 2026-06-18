const DonorModel = require("../models/doner.model");
const apiError = require("../utils/apiError");

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

    if(donation.claimedBy.toString !== userId.toString){
        throw new apiError(403 , "access denied")
    }

    return donation

}

module.exports = {
    availableDonationService,
    claimDonationService,
    myClaimedDonationservice,
    singleClaimedDonationService
}