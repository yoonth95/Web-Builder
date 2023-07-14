const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.post("/login", userController.login);
router.get("/verifyToken", userController.verifyToken);
// router.post("/signup", userController.signup);

module.exports = router;
