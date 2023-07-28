import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faEdit, faTrash, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import design_select from 'assets/images/design_select.svg';
import 'styles/Editor/Block.css';

const editBtn = [
  { id: 1, icon: faEdit },
  { id: 2, icon: faArrowRotateRight },
  { id: 3, icon: faArrowUp },
  { id: 4, icon: faArrowDown },
  { id: 5, icon: faTrash },
];

function Block({ idx, design, isOpen, setIsOpen, addBlock }) {
  const [showBlockBtn, setShowBlockBtn] = useState(false);

  return (
    <div className='block_container' onMouseOver={() => setShowBlockBtn(true)} onMouseLeave={() => setShowBlockBtn(false)}>
      <div className='wrap_btn'>
        <button className={`btn_add_block ${showBlockBtn ? 'show_add_btn' : ''}`} onClick={() => addBlock(idx, 'before')}>
          + 여기에 블록 추가
        </button>
      </div>
      <div className={`wrap_edit_btn ${showBlockBtn ? 'show_edit_btn' : ''}`}>
        {editBtn.map(({ id, icon }) => (
          <button className='btn_edit_function' key={id}>
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
        <img className='img_design_select' src={design_select} alt='마법지팡이 이미지' />
        <p>idx:{idx}</p>
        <p className='txt_design_select'>디자인을 선택하세요</p>
      </div>
      <div className='wrap_btn'>
        <button className={`btn_add_block ${showBlockBtn ? 'show_add_btn' : ''}`} onClick={() => addBlock(idx, 'after')}>
          + 여기에 블록 추가
        </button>
      </div>
    </div>
  );
}

export default Block;
