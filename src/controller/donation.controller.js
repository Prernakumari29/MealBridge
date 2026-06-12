const donationServices = require("../services/donationService")
const apiResponse = require("../utils/apiResponse")

const donationController = async(req,res)=>{

    const donation = await donationServices(req.body , req.user._id)

    return res
    .status(201)
    .json(new apiResponse ("Donation created Successfully" , donation))

}

module.exports = donationController;