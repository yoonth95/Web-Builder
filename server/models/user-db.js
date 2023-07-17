const util = require("util");
const db = require("../database/db"); // 데이터베이스 연결 설정

const query = util.promisify(db.query).bind(db);
const beginTransaction = util.promisify(db.beginTransaction).bind(db); // 트랜잭션 시작
const commit = util.promisify(db.commit).bind(db); // 트랜잭션 커밋
const rollback = util.promisify(db.rollback).bind(db); // 트랜잭션 롤백 (시작 지점으로)

exports.getUser = async (userID) => {
  try {
    const result = await query(`SELECT * FROM user where userID = ?`, userID);
    return result;
  } catch (err) {
    throw err;
  }
};

// exports.signUp = async (data) => {
//   try {
//     const result = await query(`INSERT INTO user (userID, userPW) VALUES (?, ?)`, [data[0], data[1]]);
//     return result;
//   } catch (err) {
//     throw err;
//   }
// };