const editorDB = require("../models/editor-db");

exports.getBlocks = async (req, res) => {
    const { idx } = req.params;

    try {
        const getBlocks = await editorDB.getBlocks(idx);
        res.status(200).json(getBlocks);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};