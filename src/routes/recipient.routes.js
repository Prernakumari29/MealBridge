const express = require("express");
const authmiddleware = require("../middleware/authmiddleware");
const router = express.Router();
const roleMiddleware = require("../middleware/roleMiddleware");
const { availableDonationController, claimDonationController, myClaimedDonationController, singleClaimedDonationController } = require("../controller/recipient.controller")

router.get("/available-donation" , authmiddleware ,  roleMiddleware("recipient") , availableDonationController)
router.get("/claim-donation/:id" , authmiddleware , roleMiddleware("recipient") , claimDonationController)
router.get("/myClaimed-donations/:id" , authmiddleware , roleMiddleware("recipient") , myClaimedDonationController)
router.get("/single-claimed-donation/:id" , authmiddleware , roleMiddleware("recipient") , singleClaimedDonationController)

module.exports = router