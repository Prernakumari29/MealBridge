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

module.exports = {donationServices , getMyDonationService , singleDonationService};