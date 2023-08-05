const express = require("express");
const router = express.Router();
const editorController = require("../controllers/editor-controller");

router.get("/getBlocks/:idx", editorController.getBlocks);
router.post("/insertBlock", editorController.insertBlock);
router.delete("/deleteBlock/:block_id", editorController.deleteBlock);
router.put("/orderBlock", editorController.orderBlock);
router.put("/updateBlockDesign", editorController.updateBlockDesign);
router.put("/updateBlockLayout", editorController.updateBlockLayout);
router.put("/saveBlock", editorController.saveBlock);
router.post("/copyDesign", editorController.copyDesign);

module.exports = router;
