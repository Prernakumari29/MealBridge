const DonorModel = require("../models/doner.model")
const apiError = require("../utils/apiError");

const donationServices = async(data , userId)=>{

    const {foodName , quantity , description , pickUpAddress , expiresAt} = data;

    if(!foodName || !quantity || !pickUpAddress || !expiresAt){
        throw new apiError(400 , "all fields are required")
    }

    const donation = await DonorModel.create({
        foodName,
        quantity,
        description,
        pickUpAddress,
        expiresAt,
        donor:userId
    })

    return donation;
}

const getMyDonationService = async(userId)=>{
    let findDonation = await DonorModel.find({donor:userId})
    return findDonation;
}

const singleDonationService = async(donationId)=>{
    let singleDonation = await DonorModel.findById(donationId)

    return singleDonation;
}

const updateDonationService = async(donationId , data , userId)=>{

    const donation = await DonorModel.findById(donationId);
    if(!donation){
        throw new apiError(404, "your donation is not found")
    }

    if(donation.donor.toString() !== userId.toString()){
        throw new apiError(403 ,"access denied")
    }

    const updatedDonation = await DonorModel.findByIdAndUpdate(donationId , data , {new:true})

    return updatedDonation;
}

const deleteDonationService = async(userId , donationId)=>{

    let donation = await DonorModel.findById(donationId);
    if(!donation){
        throw new apiError(404,"donation not found")
    }

    if(donation.donor.toString() !== userId.toString()){
        throw new apiError(403 , "access denied")
    }

    const deletion = await DonorModel.findByIdAndDelete(donationId);
    return deletion;
}

const trackDonationStatusService = async(donationId)=>{
    const donation = await DonorModel.findById(donationId);

     if(!donation){
        throw new apiError(404,"donation not found")
    }

    return donation

}


module.exports = {donationServices , getMyDonationService , singleDonationService , updateDonationService , deleteDonationService ,trackDonationStatusService };