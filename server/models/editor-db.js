const util = require("util");
const db = require("../database/db"); // 데이터베이스 연결 설정

const query = util.promisify(db.query).bind(db);
const beginTransaction = util.promisify(db.beginTransaction).bind(db);
const commit = util.promisify(db.commit).bind(db);
const rollback = util.promisify(db.rollback).bind(db);

// 에디터 블록 가져오기
exports.getBlocks = async (idx) => {
    try {
        const result = await query(`SELECT * FROM blocks WHERE idx=? ORDER BY block_num asc`, idx);
        return result;
    } catch (err) {
        throw err;
    }
};