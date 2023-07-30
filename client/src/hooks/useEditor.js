import { Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { updateList } from 'redux/editorSlice';

import { 
  GetBlocksAPI, 
  InsertBlockAPI, 
  UpdateBlockOrderAPI, 
  UpdateBlockDesignAPI,
  DeleteBlockAPI,
  UpdateBlockLayoutAPI,
} from '../api/Editor';


export const useEditorActions = () => {
  const blocks = useSelector(state => state.editor.blockList);
  const dispatch = useDispatch();

  // 에디터 블록 조회
  const getBlocksAction = async (page_idx, setIsLoading, setError) => {
    try {
      setIsLoading(true);
      const data = await GetBlocksAPI(page_idx);

      if (data === null) {
        Navigate('/notfound');
      } else {
        if (data.length === 0) {
          const block_id = `${page_idx}_${new Date().getTime()}_${Math.floor(Math.random() * 899999) + 100000}`;
          const newBlock = {
            page_id: page_idx,
            block_id: block_id,
            design_type: 'default',
            design_id: 0,
            layout: null,
            block_order: 1
          };

          await InsertBlockAPI(newBlock);
          dispatch(updateList([newBlock]))
        }
        let blockList = [];
        if (blocks && blocks.length > 0) {
          blockList = [...blocks];
        } 
        data.forEach(block => {
          if (!blockList.find(b => b.block_id === block.block_id)) {
            blockList.push(block)
          }
        });
        dispatch(updateList(blockList));
      }
    } catch (err) {
      console.error(err.message);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  // 블록 추가
  const insertBlockAction = async (page_idx, order, dir, setIsLoading, setError) => {
    const block_id = `${page_idx}_${new Date().getTime()}_${Math.floor(Math.random() * 899999) + 100000}`;
    const newBlock = {
      page_id: page_idx,
      block_id: block_id,
      design_type: 'default',
      design_id: 0,
      layout: null,
      block_order: dir === 'after' ? order + 1 : order
    };
  
    try {
      setIsLoading(true);
      const updatedBlocks = blocks.map(block => {
        if (block.block_order >= newBlock.block_order) {
          return {...block, block_order: block.block_order + 1}
        }
        return block;
      });

      for (const updateBlock of updatedBlocks) {
        if (blocks.find(block => block.block_id === updateBlock.block_id).block_order !== updateBlock.block_order) {
          await UpdateBlockOrderAPI(updateBlock.block_id, updateBlock.block_order);
        }
      }
  
      await InsertBlockAPI(newBlock);
  
      let blockList = [];
      if (updatedBlocks && updatedBlocks.length > 0) {
        blockList = [...updatedBlocks];
      }
      blockList.push(newBlock);
      dispatch(updateList(blockList));
    } catch (err) {
      console.error(err.message);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 블록 디자인 수정
  const updateBlockDesignAction = async (block_id, design_type, design_id) => {
    try {
      await UpdateBlockDesignAPI(block_id, design_type, design_id);
      dispatch(updateList(blocks.map(block => {
        if (block.block_id === block_id) {
          return {...block, design_type: design_type, design_id: design_id}
        }
        return block;
      })));
    } catch (err) {
      console.error(err.message);
    }
  };

  // 블록 삭제
  const deleteBlockAction = async (block_id, setIsLoading, setError) => {
    const blockToDelete = blocks.find(block => block.block_id === block_id);
    if (!blockToDelete) {
      throw new Error('Block not found');
    }

    try {
      setIsLoading(true);

      let error = false;
      const result = await DeleteBlockAPI(block_id);
      if (!result) {
        error = true;
      }

      const updatedBlocks = blocks.map(block => {
        if (block.block_order > blockToDelete.block_order) {
          return {...block, block_order: block.block_order - 1}
        }
        return block;
      });

      for (const updateBlock of updatedBlocks) {
        if (blocks.find(block => block.block_id === updateBlock.block_id).block_order !== updateBlock.block_order) {
          const result2 = await UpdateBlockOrderAPI(updateBlock.block_id, updateBlock.block_order);
          if (!result2) {
            error = true;
          }
        }
      }

      if (!error) dispatch(updateList(updatedBlocks.filter(block => block.block_id !== block_id)));

    } catch (err) {
      console.error(err.message);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // 블록 순서 수정
  const updateBlockOrderAction = async (block_id, dir, setIsLoading, setError) => {
    try {
      setIsLoading(true);
      const blockToMoveIndex = blocks.findIndex(block => block.block_id === block_id);
      if (blockToMoveIndex === -1) {
        throw new Error('Block not found');
      }

      let newBlocks = [...blocks];
      let blockToMove = { ...newBlocks[blockToMoveIndex] };
  
      // 블록을 위로 올릴 때
      if (dir === 'up' && blockToMove.block_order > 1) {
        const blockAboveIndex = newBlocks.findIndex(block => block.block_order === blockToMove.block_order - 1);
        const blockAbove = { ...newBlocks[blockAboveIndex] };

        blockAbove.block_order += 1;
        blockToMove.block_order -= 1;

        // 서버에 블록 순서 업데이트
        await Promise.allSettled([
          UpdateBlockOrderAPI(blockToMove.block_id, blockToMove.block_order),
          UpdateBlockOrderAPI(blockAbove.block_id, blockAbove.block_order)
        ]);

        newBlocks[blockToMoveIndex] = blockToMove;
        newBlocks[blockAboveIndex] = blockAbove;
      }

      // 블록을 아래로 내릴 때
      if (dir === 'down' && blockToMove.block_order < newBlocks.length) {
        const blockBelowIndex = newBlocks.findIndex(block => block.block_order === blockToMove.block_order + 1);
        let blockBelow = { ...newBlocks[blockBelowIndex] };
  
        blockBelow.block_order -= 1;
        blockToMove.block_order += 1;
  
        // 서버에 블록 순서 업데이트
        await Promise.all([
          UpdateBlockOrderAPI(blockToMove.block_id, blockToMove.block_order),
          UpdateBlockOrderAPI(blockBelow.block_id, blockBelow.block_order)
        ]);
  
        // 새로운 상태를 Redux store에 반영
        newBlocks[blockToMoveIndex] = blockToMove;
        newBlocks[blockBelowIndex] = blockBelow;
      }

      // Redux 상태 업데이트
      newBlocks.sort((a, b) => a.block_order - b.block_order);
      dispatch(updateList(newBlocks));
    } catch (err) {
      console.error(err.message);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 블록 레이아웃 수정
  const updateBlockLayoutAction = async (page_idx, order, dir, setIsLoading, setError) => {
  
  };

  return { getBlocksAction, insertBlockAction, updateBlockDesignAction, deleteBlockAction, updateBlockOrderAction, updateBlockLayoutAction };
};