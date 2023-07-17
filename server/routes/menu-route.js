const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menu-controller");

router.get("/getMenu", menuController.getMenu);
router.post("/deleteMenu", menuController.deleteMenu);

module.exports = router;
