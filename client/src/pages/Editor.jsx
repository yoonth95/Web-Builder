import React, { useState, useEffect } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { showAlert, showConfirm, showToast, hideToast } from 'redux/AlertSlice';

// hooks
import { useEditorActions } from 'hooks/useEditor';

// 컴포넌트
import Block from 'components/Editor/Block';
import Nav from 'components/Main/Nav';
// import Spinner from 'components/Spinner/Spinner';
import Loading from 'components/Spinner/Loading';

// icon 및 css
import 'styles/Editor/Editor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faTabletScreenButton, faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';

const Editor = ({ isLoading, setIsLoading }) => {
  const match = useMatch('/editor/*');
  const path = match.params['*'].split('/');
  const page_idx = path[path.length - 1];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { secondList } = useSelector((state) => state.menu);
  const blocks = useSelector((state) => state.editor.blockList);
  const [error, setError] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop');
  const [blockStyle, setBlockStyle] = useState([]); // 블록 스타일 상태 값
  const [historyList, setHistoryList] = useState([]); // 히스토리 리스트
  const [isToggle, setIsToggle] = useState(false); // 히스토리 토글
  const [isWaiting, setIsWaiting] = useState(false); // 블록 추가, 삭제, 순서 변경 시 대기 상태

  const { getBlocksAction, insertBlockAction, deleteBlockAction, updateBlockOrderAction, saveBlockAction } = useEditorActions();

  useEffect(() => {
    // 블록 조회
    const getBlocks = async () => {
      await getBlocksAction(Number(page_idx), setIsLoading, setError, setBlockStyle, setHistoryList, setIsWaiting);
    };
    getBlocks();
  }, [page_idx]);

  // 블록 추가
  const addBlock = async (order, dir) => {
    await insertBlockAction(Number(page_idx), order, dir, setIsLoading, setError, setIsWaiting);
  };

  // 블록 삭제
  const deleteBlock = (id) => {
    if (blocks.length === 1) {
      dispatch(showAlert('최소 한 개의 블록은 있어야 합니다.'));
      return;
    }
    dispatch(showConfirm({
      message: '해당 블록을 삭제하시겠습니까?',
      onConfirm: async () => {
        await deleteBlockAction(id, setIsLoading, setError, setIsWaiting);
      }
    }));
};

  // 블록 순서 변경
  const handleChangeBlockOrder = async (block_id, dir) => {
    await updateBlockOrderAction(block_id, dir, setIsLoading, setError, setIsWaiting);
  };

  // 사이즈 변경
  const handleScreenChange = (size) => {
    setScreenSize(size);
  };

  // 페이지 이동
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    dispatch(showConfirm({
      message: '저장 후 이동하시겠습니까?',
      onConfirm: async () => {
        await saveBlockAction(page_idx, blocks, setIsLoading, setError);
        dispatch(showToast({ message: '저장 되었습니다.', timer: 3000 }));
        setTimeout(() => {
            navigate(`/editor/${selectedValue}`);
        }, 3000);
      },
      onCancel: () => {
        navigate(`/editor/${selectedValue}`);
      }
    }));
};

  // 미리보기
  const handlePreview = () => {
    dispatch(showAlert('미리보기'));
  };

  
  const handleSave = async () => {
    dispatch(showToast({ message: '저장 되었습니다.', timer: 3000 }));
      const [result] = await Promise.all([
        saveBlockAction(page_idx, blocks, setIsLoading, setError),
        new Promise(resolve => setTimeout(resolve, 3000)) 
      ]); 
  };

  // if (isLoading) return <Spinner />;

  if (error) {
    dispatch(showAlert('에러', error));
    navigate(-1);
  }

  return (
    <>
      <div className='editor_wrap'>
        <div className='editor_pages_wrap'>
          <div className='editor_backup'>
            <button onClick={() => setIsToggle(!isToggle)}>복원하기</button>
            {isToggle && (
              <div className='history_menu_content'>
                <ul className='history_menu_list'>
                  {historyList.map((item, index) => (
                    <li key={index}>
                      <button >{item}</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className='editor_pages'>
            <label className='editor_pageList_Label'>현재 페이지</label>
            <select className='editor_pageList' value={page_idx} onChange={handleSelectChange}>
              {secondList.map((item) => (
                <option key={item.title} value={item.idx}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className='editor_btns'>
            {/* <button className='editor_previewBtn' onClick={handlePreview}>
              미리보기
            </button> */}
            <button className='editor_saveBtn' onClick={handleSave}>
              저장
            </button>
          </div>
        </div>
        <div className='editor_switch_screen'>
          {screenIcons.map(({ id, icon, size }) => (
            <button className='editor_switch_screen_Btn' key={id} onClick={() => handleScreenChange(size)}>
              <FontAwesomeIcon icon={icon} />
            </button>
          ))}
        </div>
      </div>
      <div className={screenSize}>
        <Nav isLoading={isLoading} setIsLoading={setIsLoading} screenSize={screenSize} type='편집' />
        <div style={{marginBottom: '30px'}}>
          {[...blocks]
            .filter((e) => e.page_id === Number(page_idx))
            .sort((a, b) => a.block_order - b.block_order)
            .map((block) => (
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
                  blockStyle={JSON.parse(block.block_style)}
                  screenSize={screenSize}
                />
              </div>
            ))}
        </div>
      </div>
      {isWaiting && <Loading />}
    </>
  );
};

export default Editor;

const screenIcons = [
  { id: '001', icon: faDesktop, size: 'desktop' },
  { id: '002', icon: faTabletScreenButton, size: 'tablet' },
  { id: '003', icon: faMobileScreenButton, size: 'mobile' },
];
