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
  const data = req.body;

  // 부모 추가
  if (!data.parent_id) {
    try {
      const getMenuLastOrder = await menuDB.getMenuLastOrder([true]);
      const order_num = getMenuLastOrder[0].count + 1;
      await menuDB.insertMenu([true, data.title, order_num]);
      res.status(200).json('메뉴를 추가하였습니다.');
    } catch (err) {
      console.error(err);
      res.status(500).json('추가 오류');
    }
  }
  // 자식 추가
  else {
    try {
      const getMenuLastOrder = await menuDB.getMenuLastOrder([false, data.parent_id]);
      const order_num = getMenuLastOrder[0].count + 1;
      await menuDB.insertMenu([false, data.parent_id, data.title, data.link, data.new_window, order_num]);
      res.status(200).json('메뉴를 추가하였습니다.');
    } catch (err) {
      console.error(err);
      res.status(500).json('추가 오류');
    }
  }
};

exports.updateMenu = async (req, res) => {
  console.log('업데이트');

  // try {
  //   await menuDB.deleteMenu(id);
  //   res.status(200).json('메뉴를 삭제하였습니다.');
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json('삭제 오류');
  // }
};