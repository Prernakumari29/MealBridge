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

    const claimed = await DonorModel.findByIdAndUpdate(donationId , {status:"claimed" , claimedBy:recipientId} , {new:true}).populate("claimedBy" , "name mobile email")

    return { donation , claimed}

}

module.exports = {
    availableDonationService,
    claimDonationService,
}