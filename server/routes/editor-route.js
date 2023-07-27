const express = require("express");
const router = express.Router();
const editorController = require("../controllers/editor-controller");

router.get("/getBlocks/:idx", editorController.getBlocks);

module.exports = router;
