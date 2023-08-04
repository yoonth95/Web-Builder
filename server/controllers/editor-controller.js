const fs = require('fs');
const path = require('path');
const editorDB = require("../models/editor-db");

// 에디터 블록 가져오기
exports.getBlocks = async (req, res) => {
    const { idx } = req.params;

    try {
        const getBlocks = await editorDB.getBlocks(idx);

        // const test = getBlocks.map((block) => {
        //     console.log(JSON.parse(Buffer.from(Buffer.from(block.content).toString('utf-8'), 'base64').toString('utf-8')))
        // });

        const result = getBlocks.map((block) => {
            const content = block.content
                ? JSON.parse(Buffer.from(Buffer.from(block.content).toString('utf-8'), 'base64').toString('utf-8'))
                : null;

            const layout_design = block.layout_design
                ? Buffer.from(Buffer.from(block.layout_design).toString('utf-8'), 'base64').toString('utf-8')
                : null;

            return {
                ...block,
                layout_design,
                content,
            }
        });

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

// 에디터 블록 추가
exports.insertBlock = async (req, res) => {
    const data = req.body;

    try {
        const result = await editorDB.insertBlock(data.page_id, data.block_id, data.block_style, data.design_type, data.design_id, data.layout_design, data.block_order);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json('추가 오류');
    }
};

// 에디터 블록 순서 변경
exports.orderBlock = async (req, res) => {
    const data = req.body;

    try {
        const result = await editorDB.orderBlock(data.block_id, data.block_order);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json('순서 변경 오류');
    }
};

// 에디터 블록 디자인 변경
exports.updateBlockDesign = async (req, res) => {
    const data = req.body;

    try {
        const result = await editorDB.updateBlockDesign(data.block_id, data.design_type, data.design_id, data.content);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json('디자인 선택 오류');
    }
}

// 에디터 블록 삭제
exports.deleteBlock = async (req, res) => {
    const { block_id } = req.params;

    console.log(block_id);

    try {
        const result = await editorDB.deleteBlock(block_id);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json('삭제 오류');
    }
}

// 에디터 블록 레이아웃 변경
exports.updateBlockLayout = async (req, res) => {
    const data = req.body;

    try {
        const result = await editorDB.updateBlockLayout(data.block_id, data.layout_design);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json('디자인 선택 오류');
    }
}


// 에디터 블록 저장
exports.saveBlock = async (req, res) => {
    const data = req.body;
    const { page_idx, blocks, srcList } = data;

    // 에디터 블록 저장 시, 에디터 블록에 포함되지 않은 이미지 파일 전부 삭제
    const imagesDirPath = path.join('static/images', String(page_idx));
    fs.readdir(imagesDirPath, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        files.forEach((file) => {
            const filePath = path.join(imagesDirPath, file);
            const fileUrl = `http://${req.headers.host}/${filePath.replace(/\\/g, '/')}`;
            if (!srcList.includes(fileUrl)) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
            }
        });
    });
    
    try {
        const result = await editorDB.saveBlock(page_idx, blocks);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json('저장 오류');
    }
}