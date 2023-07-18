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
  const { id } = req.params;

  try {
    await menuDB.deleteMenu(id);
    res.status(200).json('메뉴를 삭제하였습니다.');
  } catch (err) {
    console.error(err);
    res.status(500).json('삭제 오류');
  }
};

exports.insertMenu = async (req, res) => {
  const { isParent, title, link, new_window } = req.body;

  try {
    const getMenu = await menuDB.getMenu();
    await menuDB.insertMenu(id);
    res.status(200).json('메뉴를 추가하였습니다.');
  } catch (err) {
    console.error(err);
    res.status(500).json('추가 오류');
  }
};