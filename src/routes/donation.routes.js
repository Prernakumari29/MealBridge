const express = require("express");
const {donationController, getMyDonationController, getSingleDonationController} = require("../controller/donation.controller");
const authmiddleware = require("../middleware/authmiddleware");
const roleMiddleware = require("../middleware/roleMiddleware")
const router = express.Router();


router.post("/create-donation" ,authmiddleware,roleMiddleware("donor")  ,donationController)
router.get("/find-donation" , authmiddleware , roleMiddleware("donor") , getMyDonationController )
router.get("/single-donation/:id" , authmiddleware , roleMiddleware("donor") , getSingleDonationController)

module.exports=router;


