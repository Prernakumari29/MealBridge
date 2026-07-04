const express = require("express");
const contact = require("../controller/contact.controller");

const router = express.Router();

router.post("/contact" , contact )

module.exports = router