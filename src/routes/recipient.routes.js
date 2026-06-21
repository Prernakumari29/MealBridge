const express = require("express");
const authmiddleware = require("../middleware/authmiddleware");
const router = express.Router();
const roleMiddleware = require("../middleware/roleMiddleware");
const { availableDonationController, claimDonationController, myClaimedDonationController, singleClaimedDonationController, receiveDonationController, cancelClaimController, viewRecivedController, searchFoodController } = require("../controller/recipient.controller")

router.get("/available-donation" , authmiddleware ,  roleMiddleware("recipient") , availableDonationController)
router.get("/claim-donation/:id" , authmiddleware , roleMiddleware("recipient") , claimDonationController)
router.get("/myClaimed-donations/:id" , authmiddleware , roleMiddleware("recipient") , myClaimedDonationController)
router.get("/single-claimed-donation/:id" , authmiddleware , roleMiddleware("recipient") , singleClaimedDonationController)
router.patch("/received-donation/:id" , authmiddleware , roleMiddleware("recipient") , receiveDonationController)
router.patch("/cancelled-claimed/:id" , authmiddleware , roleMiddleware("recipient") , cancelClaimController)
router.get("/view-receivedDonation" , authmiddleware , roleMiddleware("recipient") , viewRecivedController )
router.get("/search-food" , authmiddleware , roleMiddleware("recipient") , searchFoodController)

module.exports = router