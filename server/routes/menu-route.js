const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menu-controller");

router.get("/getMenu", menuController.getMenu);
router.delete("/deleteMenu/:id", menuController.deleteMenu);
router.post("/insertMenu", menuController.insertMenu);
router.put("/updateMenu", menuController.updateMenu);
router.put("/orderMenu", menuController.orderMenu);
router.put("/editMenu", menuController.editMenu);

module.exports = router;
