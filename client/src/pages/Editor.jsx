import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop,faTabletScreenButton,faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';

// redux
import { useSelector } from 'react-redux';

// hooks
import { useEditorActions } from 'hooks/useEditor';


// 컴포넌트
import Block from 'components/Editor/Block';
import Nav from 'components/Main/Nav';
import Spinner from 'components/Spinner/Spinner';

import "styles/Editor/Editor.css"

const Editor = ({ isLoading, setIsLoading }) => {
  const { page_idx } = useParams();
  const navigate = useNavigate();
  const { secondList } = useSelector((state) => state.menu);
  const blocks = useSelector(state => state.editor.blockList);
  const [error, setError] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');
  const { getBlocksAction, insertBlockAction, deleteBlockAction, updateBlockOrderAction } = useEditorActions();

  useEffect(() => {
    // 블록 조회
    getBlocksAction(Number(page_idx), setIsLoading, setError);
  }, [page_idx]);

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

  const handleScreenChange = size => {
    setScreenSize(size);
  }

  if (isLoading) return <Spinner />;

  if (error) {
    alert('에러', error);
    navigate(-1);
  }

  return (
    <div className={screenSize}>
    <div style={{textAlign:"center", padding:"10px 0"}}>
    <div style={{ display: 'inline-block',position:"relative" }}>
      <label >현재 페이지</label>
      <select className='pageList' value={page_idx} onChange={e => navigate(`/editor/${e.target.value}`)}>
        {secondList.map(item => (
          <option key={item.title} value={item.idx}>{item.title}</option>
        ))}
      </select>
    </div>
    </div>
    <div className='switchScreen'>
      {screenIcons.map(({id,icon,size})=>(
        <button className='screenButton' key={id} onClick={()=>handleScreenChange(size)} >
          <FontAwesomeIcon icon={icon} />
      </button>))}
      </div>
   
      <Nav isLoading={isLoading} setIsLoading={setIsLoading} screenSize={screenSize} type='편집' />
      {[...blocks].sort((a, b) => a.block_order - b.block_order).map(block => (
        <div key={block.block_id}>
          <Block 
            block_id={block.block_id}
            design_type={block.design_type}
            design_id={block.design_id}
            block_order={block.block_order}
            layout_design={block.layout_design}
            addBlock={addBlock}
            deleteBlock={deleteBlock}
            handleChangeBlockOrder={handleChangeBlockOrder}
          />
        </div>
      ))}
    </div>
  );
};

export default Editor;

const screenIcons = [{id:"001",icon:faDesktop,size: 'desktop'},{id:"002",icon:faTabletScreenButton,size: 'tablet'},{id:"003",icon:faMobileScreenButton,size: 'mobile'}]