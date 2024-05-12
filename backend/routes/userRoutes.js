const express = require("express");

const userController = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/auth");

const router = express.Router();

router.use(authMiddleware);

router.get("/", userController.getAllUsers);
router.get("/me", userController.getUser);
router.delete("/delete-account", userController.deleteUser);
router.patch("/change-password", userController.changeOrSetPassword);

module.exports = router;
