const menuDB = require("../models/menu-db");

exports.getMenu = async (req, res) => {
  try {
    const getMenu = await menuDB.getMenu();
    res.status(200).json(getMenu);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
