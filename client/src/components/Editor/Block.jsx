import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setDesignType, setDesignId, setBlockOrder } from 'redux/selectBoxSlice';

import designType from 'data/designType';
import { EditorRenderBox } from 'components/Editor/EditorRenderBox';
import EditorModal from 'components/Modal/EditorModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowRotateRight, faArrowUp, faEdit, faTrash, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import 'styles/Editor/Block.css';

function Block({ block_id, design_type, design_id, block_order, addBlock, deleteBlock, handleChangeBlockOrder }) {
  const [showBlockBtn, setShowBlockBtn] = useState(false);
  const handleShowBlockBtn = (e) => {
    e.type === 'mouseover' ? setShowBlockBtn(true) : setShowBlockBtn(false);
  };
  const [isOpen, setIsOpen] = useState(false);

  const isDefault = design_type === 'default';
  const renderBox = (box, index) => EditorRenderBox[design_type](box, index);

  const correctionBtn = [
    { icon: faEdit, clickFunc: () => console.log('edit') },
    { icon: faArrowRotateRight, clickFunc: () => console.log('rotate') },
    { icon: faArrowUp, clickFunc: (order, id) => handleChangeBlockOrder(order, id, 'up') },
    { icon: faArrowDown, clickFunc: (order, id) => handleChangeBlockOrder(order, id, 'down') },
    { icon: faTrash, clickFunc: (order, id) => deleteBlock(id) },
  ];

  return (
    <>
      <div className='block_container'
        onMouseOver={handleShowBlockBtn} onMouseLeave={handleShowBlockBtn}
        style={{cursor: isDefault ? "pointer" : '', height: isDefault ? '160px' : 'auto'}}
      >
        <div className='wrap_btn'>
          <button className={`btn_add_block ${showBlockBtn ? 'show_add_btn' : ''}`} onClick={() => addBlock(block_order, 'before')}>
            + 여기에 블록 추가
          </button>
        </div>
        {isDefault ? 
          <div className='wrap_design_select' onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon className='icon_design_select' icon={faWandMagicSparkles} />
            <p>{block_id}</p>
            <p className='txt_design_select'>디자인을 선택하세요</p>
          </div>
          :
          <>
            <div className='block_correction_btn' style={{ display: showBlockBtn === true ? 'flex' : 'none' }}>
              {correctionBtn.map(({ icon, clickFunc }, index) => (
                <button className='block_function_btn' key={index}>
                  <span onClick={() => clickFunc(block_order, block_id)}><FontAwesomeIcon icon={icon} /></span>
                </button>
              ))}
            </div>
            {(designType.find((item) => item.type === design_type)).boxes.filter((item) => item.id === design_id).map((box, index) => renderBox(box, index))}
          </>
        }
        <div className='wrap_btn'>
          <button className={`btn_add_block ${showBlockBtn ? 'show_add_btn' : ''}`} onClick={() => addBlock(block_order, 'after')}>
            + 여기에 블록 추가
          </button>
        </div>
      </div>
      {isOpen && <EditorModal block_id={block_id} design_type={design_type} design_id={design_id} setIsOpen={setIsOpen} />}
    </>
  )
}

export default Block;