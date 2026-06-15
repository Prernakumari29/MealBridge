const DonorModel = require("../models/doner.model")

const availableDonationService = async()=>{
    const donation = await DonorModel.find({status:"available"})
    return donation;

}

module.exports = {
    availableDonationService,
}