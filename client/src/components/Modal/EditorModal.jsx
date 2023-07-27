import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from 'components/Editor/Table';
import { setBtnToggle, setId, setType } from 'redux/selectBoxSlice';

import designType from 'data/designType'; // 디자인 타입 데이터
import { RenderBoxFunctions } from 'components/Editor/RenderBoxFunc'; // 디자인 렌더링 함수

// fontawsome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import 'styles/Editor/EditorModal.css';

const BlockModal = ({ isOpen, setIsOpen }) => {
  const [design, setDesign] = useState('image');
  const { btnToggle } = useSelector((state) => state.selectBox);
  const selectedId = useSelector((state) => state.selectBox.id);
  const dispatch = useDispatch();

  // 왼쪽 사이드바 디자인 선택
  const handleDesign = (type) => {
    setDesign(type);
    dispatch(setType(type));
    dispatch(setBtnToggle(false));
    dispatch(setId(0));
  };
  // 블록 디자인 선택 시
  const BtnToggle = (id) => {
    dispatch(setBtnToggle(true));
    dispatch(setId(id));
  };

  const renderBox = (box, index) => RenderBoxFunctions[design](box, index, BtnToggle, selectedId);

  return (
    <>
      {isOpen && (
        <>
          <div className='editModal-container'>
            <div className='editModal-header'>
              <h3 className='font-style'>블록 디자인 추가</h3>
              <span style={{ cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
            <div className='editModal-main'>
              <div className='editModal-left font-style'>
                {designType.map((item) => (
                  <p key={item.idx} className={design === item.type ? 'designSelect' : ''} onClick={() => handleDesign(item.type)}>
                    {item.text}
                  </p>
                ))}
                {btnToggle && <button className='editMenu-select-btn'>가져오기</button>}
              </div>
              {design === 'table' ? (
                <div className='editModal_table'>
                  <Table rows={6} cols={8} />
                </div>
              ) : (
                <div className='editModal-right' style={{ gridTemplateRows: `repeat(auto-fill, ${design === 'line' ? '96px' : '160px'})` }}>
                  {designType.find((item) => item.type === design).boxes.map((box, index) => renderBox(box, index))}
                </div>
              )}
            </div>
          </div>
          <div className='editModal-overlay'></div>
        </>
      )}
    </>
  );
};

export default BlockModal;
