import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// 컴포넌트 및 데이터
import designType from 'data/designType';
import { EditorRenderBox } from 'components/Editor/EditorRenderBox';
import EditorModal from 'components/Modal/EditorModal';
import ApplyTable from 'components/Editor/ApplyTable';

import SideBar from 'components/Editor/SideBar'; 

// icon 및 css
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowRotateRight, faArrowUp, faEdit, faTrash, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import 'styles/Editor/Block.css';


function Block({ block_id, design_type, design_id, block_order, layout_design, addBlock, deleteBlock, handleChangeBlockOrder, blockStyle, setBlockStyle}) {
  const isDefault = design_type === 'default';  
  const blockContainerRef = useRef(null);

  const [showBlockBtn, setShowBlockBtn] = useState(false);
  const [isLayoutDesign, setIsLayoutDesign] = useState(false);
  const [layoutId, setLayoutId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleShowBlockBtn = (e) => {
    e.type === 'mouseover' ? setShowBlockBtn(true) : setShowBlockBtn(false);
  };

  const renderBox = (box, index) => {
    const clickHandler = () => setIsOpen(!isOpen);
    return EditorRenderBox[design_type](box, index, block_id, blockStyle, layout_design, clickHandler, setIsLayoutDesign, setLayoutId);
  };

  const correctionBtn = [
    { icon: faEdit, clickFunc: () => setSideBarOpen(!sideBarOpen)},
    { icon: faArrowRotateRight, clickFunc: ()=>setIsOpen(!isOpen) },
    { icon: faArrowUp, clickFunc: (id) => handleChangeBlockOrder(id, 'up') },
    { icon: faArrowDown, clickFunc: (id) => handleChangeBlockOrder(id, 'down') },
    { icon: faTrash, clickFunc: (id) => deleteBlock(id) },
  ];

  return (
    <>
      <div className='block_container'
        ref={blockContainerRef}
        onMouseOver={handleShowBlockBtn} onMouseLeave={handleShowBlockBtn}
        style={{cursor: isDefault ? "pointer" : '', height: isDefault ? '160px' : 'auto'}}
      >
        <div className='wrap_btn'>
          <button className={`btn_add_block ${showBlockBtn ? 'show_add_btn' : ''}`} onClick={() => addBlock(block_order, 'before')}>
            + 여기에 블록 추가
          </button>
        </div>
        {isDefault ? 
          <div className='wrap_design_select' onClick={() => {setIsOpen(!isOpen); setIsLayoutDesign(false)}}>
            <FontAwesomeIcon className='icon_design_select' icon={faWandMagicSparkles} size="2x"/>
            <p>{block_order} {block_id}</p>
            <p className='txt_design_select'>디자인을 선택하세요</p>
          </div>
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
                  <div className='module_wrap'>
                    <div className='module_container'>
                      <ApplyTable design_id={design_id} />
                    </div>
                  </div>
                </div>
              )
              : (
                <div className='module_block'>
                  {(designType.find((item) => item.type === design_type)).boxes.filter((item) => item.id === design_id).map((box, index) => renderBox(box, index, blockStyle))}
                </div>
              )
            }
          </>
        }
        <div className='wrap_btn'>
          <button className={`btn_add_block ${showBlockBtn ? 'show_add_btn' : ''}`} onClick={() => addBlock(block_order, 'after')}>
            + 여기에 블록 추가
          </button>
        </div>
      </div>
      {isOpen && <EditorModal block_id={block_id} design_type={design_type} setIsOpen={setIsOpen} isLayoutDesign={isLayoutDesign} layoutId={layoutId} />}
      <div className={`block_container_side ${sideBarOpen ? 'open' : 'close'}`}>
        <SideBar setSideBarOpen={setSideBarOpen} sideBarOpen={sideBarOpen} blockStyle={blockStyle} setBlockStyle={setBlockStyle}/>
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
};
