const express = require("express");
const donationController = require("../controller/donation.controller");
const authmiddleware = require("../middleware/authmiddleware");
const roleMiddleware = require("../middleware/roleMiddleware")
const router = express.Router();


router.post("/create-donation" ,authmiddleware,roleMiddleware("donor")  ,donationController)

module.exports=router;


