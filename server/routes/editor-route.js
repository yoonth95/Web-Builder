const express = require("express");
const router = express.Router();
const editorController = require("../controllers/editor-controller");

router.get("/getBlocks/:idx", editorController.getBlocks);
router.post("/insertBlock", editorController.insertBlock);
router.delete("/deleteBlock/:block_id", editorController.deleteBlock);
router.put("/orderBlock", editorController.orderBlock);
router.put("/updateBlockDesign", editorController.updateBlockDesign);
router.put("/updateBlockLayout", editorController.updateBlockLayout);

module.exports = router;
