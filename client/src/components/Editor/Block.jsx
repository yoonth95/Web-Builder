import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// 컴포넌트 및 데이터
import designType from 'data/designType';
import { EditorRenderBox } from 'components/Editor/EditorRenderBox';
import EditorModal from 'components/Modal/EditorModal';
import ApplyTable from 'components/Editor/ApplyTable';
import { useEditorActions } from 'hooks/useEditor';
import SideBar from 'components/Editor/SideBar'; 

// icon 및 css
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowRotateRight, faArrowUp, faEdit, faTrash, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import 'styles/Editor/Block.css';


function Block({ block_id, design_type, design_id, block_order, layout_design, block_content, addBlock, deleteBlock, handleChangeBlockOrder, blockStyle, setBlockStyle }) {
  const isDefault = design_type === 'default';  
  const blockContainerRef = useRef(null);
  const { handleUpdateText } = useEditorActions();
  const [showBlockBtn, setShowBlockBtn] = useState(false);
  const [checkBtn, setCheckBtn] = useState(false);
  const [isLayoutDesign, setIsLayoutDesign] = useState(false);
  const [layoutId, setLayoutId] = useState(0);
  const [sideBarOpen, setSideBarOpen] = useState({open: false, block_id: ''});
  const [isModalOpen, setIsModalOpen] = useState({open: false, block_id: ''});
  
  const handleShowBlockBtn = (e) => {
    e.type === 'mouseover' ? setShowBlockBtn(true) : setShowBlockBtn(false);
  };

  const renderBox = (box, id) => { 
    const clickHandler = () => setIsModalOpen({open: true, block_id: id});
    return EditorRenderBox[design_type](box, id, blockStyle, handleUpdateText, layout_design, clickHandler, setIsLayoutDesign, setLayoutId);
  };

  const correctionBtn = [
    { icon: faEdit, clickFunc: () => setSideBarOpen({open: true, block_id: block_id})},
    { icon: faArrowRotateRight, clickFunc: ()=>setIsModalOpen({open: true, block_id: block_id})},
    { icon: faArrowUp, clickFunc: (id) => handleChangeBlockOrder(id, 'up') },
    { icon: faArrowDown, clickFunc: (id) => handleChangeBlockOrder(id, 'down') },
    { icon: faTrash, clickFunc: (id) => deleteBlock(id) },
  ];
  
  const renderAddBlockButton = (a) => {
    if (!sideBarOpen.open) { // SideBar가 열려있을 때는 추가버튼 숨김
      return (
        <div className='wrap_btn'>
          <button className={`btn_add_block ${showBlockBtn ? 'show_add_btn' : ''}`} onClick={() => addBlock(block_order, a)}>
            + 여기에 블록 추가
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className='block_container'
        ref={blockContainerRef}
        onMouseOver={handleShowBlockBtn} onMouseLeave={handleShowBlockBtn}
        style={{cursor: isDefault ? "pointer" : '', height: isDefault ? '160px' : 'auto'}}
      >
        {renderAddBlockButton('before')}
        {isDefault ? 
          <>
            <div className='block_correction_btn delete_block_btn' style={{ display: showBlockBtn === true ? 'flex' : 'none' }}>
              <button className='block_function_btn'>
                <span onClick={() => correctionBtn[4].clickFunc(block_id)}><FontAwesomeIcon icon={correctionBtn[4].icon} /></span>
              </button>
            </div>
            <div className='wrap_design_select' onClick={() => {
              if (!sideBarOpen.open) {
                setIsModalOpen({open: true, block_id: block_id});
                setIsLayoutDesign(false);
              }
            }}>
              <FontAwesomeIcon className='icon_design_select' icon={faWandMagicSparkles} size="2x"/>
              <p>{block_order} {block_id}</p>
              <p className='txt_design_select'>디자인을 선택하세요</p>
            </div>
          </>
          :
          <>
            <div className='block_correction_btn' style={{ display: showBlockBtn === true ? 'flex' : 'none' }}>
              {correctionBtn.map(({ icon, clickFunc }, index) => (
                <button className='block_function_btn' key={index}>
                  <span onClick={() => clickFunc(block_id)}><FontAwesomeIcon icon={icon} /></span>
                </button>
              ))}
            </div>
            {design_type === 'table'
              ? (
                <div className='module_block'>
                  <div className={`module_wrap ${checkBtn ? 'widthSet' : ''}`}>
                    <div className='module_container'> 
                      <ApplyTable design_id={design_id} />
                    </div>
                  </div>
                </div>
              )
              : (
                <div className='module_block'>
                    {block_content 
                      ? renderBox(block_content, block_id, blockStyle, handleUpdateText)
                      : (designType.find((item) => item.type === design_type)).boxes.filter((item) => item.id === design_id).map(box => renderBox(box, block_id, blockStyle))
                    }
                </div>
              )
            }
          </>
        }
        {renderAddBlockButton('after')}
      </div>
      {isModalOpen.open && <EditorModal design_type={design_type} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} isLayoutDesign={isLayoutDesign} layoutId={layoutId} />} 
      <div className={`block_container_side ${sideBarOpen.open ? 'open' : 'close'}`}>
        <SideBar checkBtn={checkBtn} setCheckBtn={setCheckBtn} sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} blockStyle={blockStyle} setBlockStyle={setBlockStyle}/>
      </div>
    </>
  )
}

export default Block;

Block.propTypes = {
  block_id: PropTypes.string.isRequired,
  design_type: PropTypes.string.isRequired,
  design_id: PropTypes.string.isRequired,
  block_order: PropTypes.number.isRequired,
  layout_design: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  // block_content: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
  addBlock: PropTypes.func.isRequired,
  deleteBlock: PropTypes.func.isRequired,
  handleChangeBlockOrder: PropTypes.func.isRequired,
  // blockStyle: PropTypes.object.isRequired,
  setBlockStyle: PropTypes.func.isRequired,
};