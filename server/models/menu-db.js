const db = require("../database/db"); // 데이터베이스 연결 설정

exports.getMenu = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM menus order by order_num asc`, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.deleteMenu = (idx) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM menus where idx = ?`, idx, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};
