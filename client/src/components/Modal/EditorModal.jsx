import React, { useState } from 'react';

// fontawsome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faImage } from '@fortawesome/free-solid-svg-icons';

import 'styles/Editor/EditorModal.css';

const designType = [
  {
    idx: 1,
    type: 'image',
    text: '이미지',
    boxes: [
      { numImages: 1, style: { width: '100%', height: '100%', fontSize: '50px' } },
      { numImages: 2, style: { width: '100%', height: '100%', fontSize: '50px' } },
      { numImages: 3, style: { width: '100%', height: '100%', fontSize: '50px' } },
      { numImages: 4, style: { width: '100%', height: '100%', fontSize: '50px' } },
      { numImages: 4, style: { width: '90px', height: '90px', borderRadius: '50%', fontSize: '50px' } },
      { numImages: 5, style: { width: '70px', height: '70px', borderRadius: '50%', fontSize: '25px' } },
      // 디자인을 추가할 경우 (이미지 갯수, 이미지 표현 형태 스타일 원형일 경우 borderRadius: 50%)
    ],
    renderBox: (box, index) => (
      <div key={index} className='typeBox'>
        <div className='parentBox'>
          {[...Array(box.numImages)].map((n, i) => (
            <div key={i} style={box.style} className='imageBox'>
              <FontAwesomeIcon icon={faImage} />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    idx: 2,
    type: 'line',
    text: '구분선',
    boxes: [
      { thickness: '1px', style: 'solid', length: 'long', direction: 'horizontal' },
      { thickness: '1px', style: 'dashed', length: 'long', direction: 'horizontal' },
      { thickness: '2px', style: 'solid', length: 'long', direction: 'horizontal' },
      { thickness: '2px', style: 'dashed', length: 'long', direction: 'horizontal' },
      { thickness: '3px', style: 'solid', length: 'long', direction: 'horizontal' },
      { thickness: '3px', style: 'dashed', length: 'long', direction: 'horizontal' },
      { thickness: '1px', style: 'solid', length: 'short', direction: 'horizontal' },
      { thickness: '3px', style: 'dotted', length: 'long', direction: 'horizontal' },
      { thickness: '1px', style: 'solid', length: 'short', direction: 'diagonal' },
      { thickness: '1px', style: 'solid', length: 'short', direction: 'vertical' },
      // 디자인을 추가할 경우 (두께, 스타일, 길이, 방향)
    ],
    renderBox: (box, index) => {
      const isDotted = box.style === 'dotted';
      return (
        <div key={index} className='typeBox' style={{ height: '96px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0' }}>
          <div
            style={{
              borderTop: isDotted ? 'none' : `${box.thickness} ${box.style} #B3B3B3`,
              backgroundImage: isDotted ? `radial-gradient(circle, rgb(179, 179, 179) 15%, transparent 0%)` : 'none',
              backgroundSize: isDotted ? '25px 100%' : 'auto',
              width: box.length === 'long' ? '100%' : '15%',
              transform: box.direction === 'diagonal' ? 'rotate(135deg)' : box.direction === 'vertical' ? 'rotate(90deg)' : 'none',
              height: isDotted ? `${box.thickness}` : 'auto',
            }}
          />
        </div>
      );
    },
  },
  {
    idx: 3,
    type: 'list',
    text: '목록',
    boxes: [
      { shape: 'circle', hasTitle: true },
      { shape: 'rectangle', hasTitle: true, hasDetails: true },
      { shape: 'square', hasTitle: true, hasSubtitle: true, hasContent: true },
      { shape: 'wideRectangle', hasTitle: true, hasContent: true },
    ],
    renderBox: (box, index) => (
      <div key={index} className='typeBox'>
        <div className={`imageBox ${box.shape}`}>
          <FontAwesomeIcon icon={faImage} />
        </div>
        {box.hasText && <p className='text'>[텍스트]</p>}
        {box.hasTitle && <h3 className='title'>제목</h3>}
        {box.hasSubtitle && <h4 className='subtitle'>부제</h4>}
        {box.hasDetails && <p className='details'>상세 내용</p>}
        {box.hasContent && <p className='content'>내용</p>}
      </div>
    ),
  },
];

const BlockModal = ({ isOpen, setIsOpen }) => {
  const [design, setDesign] = useState('image');

  const handleDesign = (type) => {
    setDesign(type);
  };

  console.log(design);

  return (
    <>
      {isOpen && (
        <>
          <div className='editModal-container'>
            <div className='editModal-header'>
              <h3 className='font-style'>블록 디자인 추가</h3>
              <span style={{}} onClick={() => setIsOpen(!isOpen)}>
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
              </div>
              <div className='editModal-right' style={{ gridTemplateRows: `repeat(auto-fill, ${design === 'line' ? '96px' : '160px'})` }}>
                {designType.find((item) => item.type === design).boxes.map((box, index) => designType.find((item) => item.type === design).renderBox(box, index))}
              </div>
            </div>
          </div>
          <div className='editModal-overlay'></div>
        </>
      )}
    </>
  );
};

export default BlockModal;
