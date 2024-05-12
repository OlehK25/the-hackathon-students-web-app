const express = require("express");
const userController = require("../controllers/users.controller");

const usersRouter = express.Router();


usersRouter.get("/", userController.getMe);
usersRouter.get("/me", userController.getMe);

module.exports = usersRouter;
