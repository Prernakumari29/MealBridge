const express = require("express");
const {donationController, getMyDonationController, getSingleDonationController, updateDonationController, deleteDonationController, trackDonationController} = require("../controller/donation.controller");
const authmiddleware = require("../middleware/authmiddleware");
const roleMiddleware = require("../middleware/roleMiddleware")
const router = express.Router();


router.post("/create-donation" ,authmiddleware,roleMiddleware("donor")  ,donationController)
router.get("/find-donation" , authmiddleware , roleMiddleware("donor") , getMyDonationController )
router.get("/single-donation/:id" , authmiddleware , roleMiddleware("donor") , getSingleDonationController)
router.patch("/update-donation/:id" , authmiddleware , roleMiddleware("donor") , updateDonationController )
router.delete("/delete-donation/:id" , authmiddleware , roleMiddleware("donor") , deleteDonationController)
router.get("/track-donation/:id" , authmiddleware, trackDonationController)

module.exports=router;


