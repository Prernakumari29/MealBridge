const { availableDonationService } = require("../services/recipient.service");
const apiResponse = require("../utils/apiResponse");

const availableDonationController = async(req,res)=>{
    const donation = await availableDonationService();

    return res
    .status(200)
    .json(new apiResponse("Available donation fetched succesfully" , donation))
}

module.exports = {
    availableDonationController,
}