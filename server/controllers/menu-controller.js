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

exports.deleteMenu = async (req, res) => {
  const { menu_idx } = req.body;

  try {
    await menuDB.deleteMenu(menu_idx);
    res.status(200).json('메뉴를 삭제하였습니다.');
  } catch (err) {
    console.error(err);
    res.status(500).json('삭제 오류');
  }
};