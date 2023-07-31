const util = require("util");
const db = require("../database/db"); // 데이터베이스 연결 설정

const query = util.promisify(db.query).bind(db);
const beginTransaction = util.promisify(db.beginTransaction).bind(db);
const commit = util.promisify(db.commit).bind(db);
const rollback = util.promisify(db.rollback).bind(db);

// 에디터 블록 가져오기
exports.getBlocks = async (idx) => {
    try {
        const result = await query(`SELECT page_id, block_id, design_type, design_id, layout_design, content, block_order FROM blocks WHERE page_id=? ORDER BY block_order asc`, idx);
        return result;
    } catch (err) {
        throw err;
    }
};

// 에디터 블록 추가
exports.insertBlock = async (page_id, block_id, design_type, design_id, layout_design, block_order) => {
    try {
        const result = await query(`INSERT INTO blocks (page_id, block_id, design_type, design_id, layout_design, block_order) VALUES (?, ?, ?, ?, ?, ?)`, [page_id, block_id, design_type, design_id, layout_design, block_order]);
        return result;
    } catch (err) {
        throw err;
    }
};

// 에디터 블록 순서 변경
exports.orderBlock = async (block_id, block_order) => {
    try {
        const result = await query(`UPDATE blocks SET block_order=? WHERE block_id=?`, [block_order, block_id]);
        return result;
    } catch (err) {
        throw err;
    }
}

// 에디터 블록 디자인 변경
exports.updateBlockDesign = async (block_id, design_type, design_id) => {
    try {
        const result = await query(`UPDATE blocks SET design_type=?, design_id=? WHERE block_id=?`, [design_type, design_id, block_id]);
        return result;
    } catch (err) {
        throw err;
    }
}

// 에디터 블록 삭제
exports.deleteBlock = async (block_id) => {
    try {
        const result = await query(`DELETE FROM blocks where block_id = ?`, block_id);
        return result;
    } catch (err) {
        throw err;
    }
}

// 에디터 블록 레이아웃 변경
exports.updateBlockLayout = async (block_id, design_type, design_id) => {
    // try {
    //     const result = await query(`UPDATE blocks SET design_type=?, design_id=? WHERE block_id=?`, [design_type, design_id, block_id]);
    //     return result;
    // } catch (err) {
    //     throw err;
    // }
}