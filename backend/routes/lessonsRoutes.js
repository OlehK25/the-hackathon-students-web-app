const express = require("express");
const LessonsController = require("../controllers/lessonsController");

const lessonsRouter = express.Router();


lessonsRouter.post("/", LessonsController.getLessonsData);

module.exports = lessonsRouter;
