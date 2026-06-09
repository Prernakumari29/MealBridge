const express = require("express");
const { registerController, loginController, logoutCOntroller } = require("../controller/auth.controller");
const authmiddleware = require("../middleware/authmiddleware");


const router = express.Router();

router.post("/register" , registerController)
router.post("/login" , loginController)
router.post("/logout" , authmiddleware , logoutCOntroller )

module.exports = router;