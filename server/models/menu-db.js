const util = require("util");
const db = require("../database/db"); // 데이터베이스 연결 설정

const query = util.promisify(db.query).bind(db);
const beginTransaction = util.promisify(db.beginTransaction).bind(db);
const commit = util.promisify(db.commit).bind(db);
const rollback = util.promisify(db.rollback).bind(db);

exports.getMenu = async () => {
  try {
    const result = await query(`SELECT * FROM menus order by order_num asc`);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteMenu = async (idx) => {
  try {
    const result = await query(`DELETE FROM menus where idx = ?`, idx);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteMenu = async (idx) => {
  try {
    const result = await query(`DELETE FROM menus where idx = ?`, idx);
    return result;
  } catch (err) {
    throw err;
  }
};

// 임시로 만든 코드 data 값들 수정 해야 함
exports.insertMenu = async (data) => {
  try {
    await beginTransaction(); // 트랜잭션 시작

    // Insert menus table
    const result1 = await query("INSERT INTO menus (title, link, parent_id) VALUES (?, ?, ?)", ["New Menu", "/new_menu", 1]);

    // last idx
    const lastId = result1.insertId;

    // Insert pages table
    const result2 = await query("INSERT INTO pages (menu_idx, page_name, page_path, menu_name) VALUES (?, ?, ?, ?)", [lastId, "New Menu Page", "/new_menu", "First Menu"]);

    await commit(); // 트랜잭션 수행

    return result2;
  } catch (error) {
    await rollback(); // 중간에서 에러 발생 시 rollback으로 트랜잭션 시작 지점으로 돌아가기
    throw error; // 오류
  }
};

// 임시로 만든 코드 data 값들 수정 해야 함
exports.insertMenu = async (data) => {
  try {
    await beginTransaction(); // 트랜잭션 시작

    // Insert menus table
    const result1 = await query("INSERT INTO menus (title, link, parent_id) VALUES (?, ?, ?)", ["New Menu", "/new_menu", 1]);

    // last idx
    const lastId = result1.insertId;

    // Insert pages table
    const result2 = await query("INSERT INTO pages (menu_idx, page_name, page_path, menu_name) VALUES (?, ?, ?, ?)", [lastId, "New Menu Page", "/new_menu", "First Menu"]);

    await commit(); // 트랜잭션 수행

    return result2;
  } catch (error) {
    await rollback(); // 중간에서 에러 발생 시 rollback으로 트랜잭션 시작 지점으로 돌아가기
    throw error; // 오류
  }
};