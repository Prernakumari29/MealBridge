const express = require("express");
const connected = require("./config/db");
const app = express();
connected();

module.exports = app;