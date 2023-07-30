import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

// hooks
import { useEditorActions } from 'hooks/useEditor';

// 컴포넌트
import Block from 'components/Editor/Block';
import Nav from 'components/Main/Nav';
import Spinner from 'components/Spinner/Spinner';


const Editor = ({ isLoading, setIsLoading }) => {
  const { page_idx } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const blocks = useSelector(state => state.editor.blockList);
  const { getBlocksAction, insertBlockAction, deleteBlockAction, updateBlockOrderAction, updateBlockLayoutAction } = useEditorActions();

  useEffect(() => {
    // 블록 조회
    getBlocksAction(Number(page_idx), setIsLoading, setError);
  }, []);

  // 블록 추가
  const addBlock = (order, dir) => {
    insertBlockAction(Number(page_idx), order, dir, setIsLoading, setError);
  };

  // 블록 삭제, 순서 변경 아직 못함
  // 블록 삭제
  const deleteBlock = (id) => {
    if (blocks.length === 1) {
      alert('최소 한 개의 블록은 있어야 합니다.');
      return;
    }
    if (window.confirm('해당 블록을 삭제하시겠습니까?')) deleteBlockAction(id, setIsLoading, setError);
  };

  // 블록 순서 변경
  const handleChangeBlockOrder = async (block_id, dir) => {
    await updateBlockOrderAction(block_id, dir, setIsLoading, setError);
  }

  if (isLoading) return <Spinner />;

  if (error) {
    alert('에러', error);
    navigate(-1);
  }

  return (
    <>
      <Nav isLoading={isLoading} setIsLoading={setIsLoading} type='편집' />
      {[...blocks].sort((a, b) => a.block_order - b.block_order).map(block => (
        <div key={block.block_id}>
          <Block 
            block_id={block.block_id}
            design_type={block.design_type}
            design_id={block.design_id}
            block_order={block.block_order}
            addBlock={addBlock}
            deleteBlock={deleteBlock}
            handleChangeBlockOrder={handleChangeBlockOrder}
          />
        </div>
      ))}
    </>
  );
};

export default Editor;