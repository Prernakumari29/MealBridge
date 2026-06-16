const express = require("express");
const authmiddleware = require("../middleware/authmiddleware");
const router = express.Router();
const roleMiddleware = require("../middleware/roleMiddleware");
const { availableDonationController, claimDonationController } = require("../controller/recipient.controller")

router.get("/available-donation" , authmiddleware ,  roleMiddleware("recipient") , availableDonationController)
router.get("/claim-donation/:id" , authmiddleware , roleMiddleware("recipient") , claimDonationController)

module.exports = router