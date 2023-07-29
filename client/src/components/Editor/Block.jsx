import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faEdit, faTrash, faArrowRotateRight, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import 'styles/Editor/Block.css';

function Block({ idx, isOpen, setIsOpen, handleAddBlock, handleDeleteBlock }) {
  const [showBlockBtn, setShowBlockBtn] = useState(false);
  const handleShowBlockBtn = (e) => {
    if (e.type === 'mouseover') {
      setShowBlockBtn(true);
    } else {
      setShowBlockBtn(false);
    }
  };

  const editBtn = [
    { icon: faEdit, func: () => handleDeleteBlock(idx) },
    { icon: faArrowRotateRight, func: () => handleDeleteBlock(idx) },
    { icon: faArrowUp, func: () => handleDeleteBlock(idx) },
    { icon: faArrowDown, func: () => handleDeleteBlock(idx) },
    { icon: faTrash, func: () => handleDeleteBlock(idx) },
  ];

  return (
    <div className='block_container' onMouseOver={handleShowBlockBtn} onMouseLeave={handleShowBlockBtn}>
      <div className='wrap_btn'>
        <button className={`btn_add_block ${showBlockBtn ? 'show_add_btn' : ''}`} onClick={() => handleAddBlock(idx, 'before')}>
          + 여기에 블록 추가
        </button>
      </div>
      <div className={`wrap_edit_btn ${showBlockBtn ? 'show_edit_btn' : ''}`}>
        {editBtn.map(({ icon, func }, index) => (
          <button className='btn_edit_function' key={`${icon}_${index}`} onClick={func}>
            <FontAwesomeIcon icon={icon} />
          </button>
        ))}
      </div>
      <div
        className='wrap_design_select'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <FontAwesomeIcon className='icon_design_select' icon={faWandMagicSparkles} />
        <p>idx:{idx}</p>
        <p className='txt_design_select'>디자인을 선택하세요</p>
      </div>
      <div className='wrap_btn'>
        <button className={`btn_add_block ${showBlockBtn ? 'show_add_btn' : ''}`} onClick={() => handleAddBlock(idx, 'after')}>
          + 여기에 블록 추가
        </button>
      </div>
    </div>
  );
}

export default Block;
