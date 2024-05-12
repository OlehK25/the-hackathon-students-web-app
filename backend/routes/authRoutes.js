const express = require("express");

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();


module.exports = router;
