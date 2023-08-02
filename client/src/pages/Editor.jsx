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
// import SideBar from 'components/Editor/SideBar'; 

// icon 및 css
import "styles/Editor/Editor.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop,faTabletScreenButton,faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';

const Editor = ({ isLoading, setIsLoading }) => {
  const { page_idx } = useParams();
  const navigate = useNavigate();
  const { secondList } = useSelector((state) => state.menu);
  const blocks = useSelector(state => state.editor.blockList);
  const [error, setError] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');
  const [blockStyle, setBlockStyle] = useState([]);   // 블록 스타일 상태 값
  const { getBlocksAction, insertBlockAction, deleteBlockAction, updateBlockOrderAction, saveBlockAction } = useEditorActions();

  useEffect(() => {
    // 블록 조회
    getBlocksAction(Number(page_idx), setIsLoading, setError, setBlockStyle);
  }, [page_idx]);


  // 블록 추가
  const addBlock = (order, dir) => {
    insertBlockAction(Number(page_idx), order, dir, setIsLoading, setError);
  };

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

  // 사이즈 변경
  const handleScreenChange = size => {
    setScreenSize(size);
  }
  
  // 페이지 이동
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (window.confirm('저장 후 이동하시겠습니까?')) {
      handleSave();
      navigate(`/editor/${selectedValue}`);
    }
  };

  // 미리보기
  const handlePreview = () => {
    alert('미리보기');
  };

  // 저장
  const handleSave = async () => {
    const result = await saveBlockAction(page_idx, blockStyle, setIsLoading, setError);
    console.log(result);
    alert('저장되었습니다.');
  };

  if (isLoading) return <Spinner />;

  if (error) {
    alert('에러', error);
    navigate(-1);
  }

  return (
   <>
      <div className='editor_wrap'>
        <div className='editor_pages_wrap'>
          <div className='editor_pages'>
            <label className='editor_pageList_Label'>현재 페이지</label>
            <select className='editor_pageList' value={page_idx} onChange={handleSelectChange}>
            {secondList.map(item => (
              <option key={item.title} value={item.idx}>{item.title}</option>
            ))}
            </select>
          </div>
          <div className='editor_btns'>
            <button className='editor_previewBtn' onClick={handlePreview}>미리보기</button>
            <button className='editor_saveBtn' onClick={handleSave}>저장</button>
          </div>
        </div>
        <div className='editor_switch_screen'>
          {screenIcons.map(({id,icon,size})=>(
            <button className='editor_switch_screen_Btn' key={id} onClick={()=>handleScreenChange(size)} >
              <FontAwesomeIcon icon={icon} />
          </button>))}
        </div>
      </div>
      <div className={screenSize}>
        <Nav isLoading={isLoading} setIsLoading={setIsLoading} screenSize={screenSize}  type='편집' />
        {[...blocks].sort((a, b) => a.block_order - b.block_order).map(block => (
          <div key={block.block_id}>
            <Block 
              block_id={block.block_id}
              design_type={block.design_type}
              design_id={block.design_id}
              block_order={block.block_order}
              layout_design={block.layout_design}
              block_content={block.content}
              addBlock={addBlock}
              deleteBlock={deleteBlock}
              handleChangeBlockOrder={handleChangeBlockOrder}
              blockStyle={blockStyle}
              setBlockStyle={setBlockStyle}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Editor;

const screenIcons = [{id:"001",icon:faDesktop,size: 'desktop'},{id:"002",icon:faTabletScreenButton,size: 'tablet'},{id:"003",icon:faMobileScreenButton,size: 'mobile'}]

