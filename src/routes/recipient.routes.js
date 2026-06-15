const express = require("express");
const authmiddleware = require("../middleware/authmiddleware");
const router = express.Router();
const roleMiddleware = require("../middleware/roleMiddleware");
const { availableDonationController } = require("../controller/recipient.controller")

router.get("/available-donation" , authmiddleware ,  roleMiddleware("recipient") , availableDonationController)

module.exports = router