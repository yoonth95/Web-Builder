import React, { useState } from 'react';

import Table from 'components/Editor/Table';

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
      // 디자인을 추가할 경우 (이미지 개수, 이미지 표현 형태 스타일 원형일 경우 borderRadius: 50%)
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
      { shape: 'circle', hasText: true },
      { shape: 'rectangle', hasTitle: true, hasDetails: true },
      { shape: 'square', hasTitleColor: true, hasSubtitle: true, hasTinyText: true },
      { shape: 'wideRectangle', hasTitle: true, hasContent: true },
      // 디자인을 추가할 경우 (모양, 텍스트, 제목, 부제목, 내용, 상세설명, 작은 텍스트 등 사용할 내용은 true로 설정)
    ],
    renderBox: (box, index) => (
      <div key={index} className='typeBox listBox font-style'>
        <div className={`listImage ${box.shape}`}>
          <FontAwesomeIcon icon={faImage} />
        </div>
        {box.hasTitle && <p className='title'>제목</p>}
        {box.hasTitleColor && <p className='titleColor'>1:1 방문</p>}
        {box.hasSubtitle && <p className='subtitle'>주 1회 / 과목당 10분</p>}
        {box.hasText && <p className='text'>초단기한글</p>}
        {box.hasTinyText && <p className='tinyText'>학습관리 및 상담</p>}
        {box.hasDetails && <p className='details'>친구들과 함께 모여 교과 과정에 필요한 핵심 과목을 <br/>집중적으로 관리 받습니다. 전문 선생님의 학습 관리로 자기주도 <br/>학습을 성장시킬 수 있습니다.</p>}
        {box.hasContent && <p className='content'>북패드 디지털 콘텐츠를 활용하여 <br/>학생들의 지면 학습을 더욱 심도 깊고 <br/>쉽게 이해하여 기본 개념을 탄탄하게 합니다.</p>}
      </div>
    ),
  },
  {
    idx: 4,
    type: 'text',
    text: '텍스트',
    boxes: [
      { alignments: 'center', lines: [
        { fontSize: '12px', color: 'blue', fontWeight: 'normal', text: '첫 번째 단락' },
        { margin: '7px 0 11px', fontSize: '16px', color: 'black', fontWeight: 'bolder', text: '두 번째 단락' },
        { fontSize: '12px', color: 'black', fontWeight: 'normal', text: '세 번째 단락' },
      ]},
      { alignments: 'center', lines: [
        { margin: '0 0 11px', fontSize: '24px', color: 'black', fontWeight: 'bolder', text: '첫 번째 단락' },
        { fontSize: '12px', color: 'black', fontWeight: 'normal', text: '두 번째 단락' },
      ]},
      { alignments: 'center', lines: [
        { fontSize: '24px', color: 'black', fontWeight: 'bolder', text: '첫 번째 단락' },
      ]},
      { alignments: 'center', lines: [
        { fontSize: '16px', color: 'black', fontWeight: 'bolder', text: '첫 번째 단락' },
        { margin: '7px 0 14px', fontSize: '12px', color: 'black', fontWeight: 'normal', text: '두 번째 단락' },
        { fontSize: '12px', color: 'black', fontWeight: 'normal', button: 'SHOW', buttonStyle: 'textBoxBtn' },
      ]},
      { alignments: 'center', lines: [
        { fontSize: '12px', color: 'black', fontWeight: 'normal', text: '첫 번째 단락' },
      ]},
      { alignments: 'left', lines: [
        { fontSize: '12px', color: 'blue', fontWeight: 'normal', text: '첫 번째 단락' },
        { margin: '5px 0 20px', fontSize: '16px', color: 'black', fontWeight: 'bolder', text: '두 번째 단락' },
        { fontSize: '12px', color: 'black', fontWeight: 'normal', button: 'SHOW', buttonStyle: 'textBoxBtn2' },
      ]},
      // 디자인을 추가할 경우 (alignments: 정렬 방식, lines: [ 단락 ], margin: 단락 간격, fontSize: 폰트 크기, color: 폰트 색상, fontWeight: 폰트 굵기, text: 텍스트, button: 버튼 텍스트, buttonStyle: 버튼 스타일)
    ],
    renderBox: (box, index) => (
      <div key={index} className='typeBox'>
        <div className='textBox' style={{ textAlign: `${box.alignments}` }}>
          {box.lines.map((line, i) => (
            <p key={i} style={{ margin: line.margin, fontSize: line.fontSize, color: line.color, fontWeight: line.fontWeight }}>
              {line.text}
              {line.button && <button className={line.buttonStyle}>{line.button}</button>}
            </p>
          ))}
        </div>
      </div>
    ),
  },
  {
    idx: 5,
    type: 'table',
    text: '표',
  },
  {
    idx: 6,
    type: 'layout',
    text: '레이아웃',
    boxes: [
      {
        layout: '2 elements, same size',
        style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
        elements: [{ style: { flex: 1 } }, { style: { flex: 1 } }],
      },
      {
        layout: '2 elements, 1.5:1 ratio',
        style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
        elements: [{ style: { flex: 1.5 } }, { style: { flex: 1 } }],
      },
      {
        layout: '3 elements, same size',
        style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
        elements: [{ style: { flex: 1 } }, { style: { flex: 1 } }, { style: { flex: 1 } }],
      },
      {
        layout: '1:1.5 row split',
        style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', },
        elements: [
          { style: { flex: 1 } },
          {
            style: { flex: 1.5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' },
            children: [{ style: { flex: 1 } }, { style: { flex: 1 } }],
          },
        ],
      },
      {
        layout: '4 elements, same size',
        style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
        elements: [{ style: { flex: 1 } }, { style: { flex: 1 } }, { style: { flex: 1 } }, { style: { flex: 1 } }],
      },
      {
        layout: '1:1:1 split, middle split into 2',
        style: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
        elements: [
          { style: { flex: 1 } },
          {
            style: { flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '10px' },
            children: [{ style: { flex: 1 } }, { style: { flex: 1 } }],
          },
          { style: { flex: 1 } },
        ],
      },
      {
        layout: '3 vertical elements, same size',
        style: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
        elements: [{ style: { flex: 1 } }, { style: { flex: 1 } }, { style: { flex: 1 } }],
      },
      {
        layout: '2x2 grid',
        style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '10px' },
        elements: [{}, {}, {}, {}],
      },
    ],
    // 디자인을 추가할 경우 (layout: 레이아웃 형태, style: 레이아웃 스타일, elements: [ 레이아웃 요소 ], flex: flex 값, display: flex 방향, flexDirection: flex 방향, justifyContent: flex 정렬 방식, gap: flex 간격)
    renderBox: (box, index) => (
      <div key={index} className='typeBox' style={{...box.style, gap: '10px'}}>
        {box.elements.map((element, i) => (
          <div key={i} className={element.children ? '' : 'layoutBox'} style={element.style}>
            {element.children ? element.children.map((child, j) => (
              <div key={j} className='layoutBox' style={child.style}></div>
            )) : null}
          </div>
        ))}
      </div>
    ),
  }
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
              {design === 'table' ? (
                <div className='editModal-right'>
                  <Table rows={3} cols={3} />
                </div>
              ) : (
                <div className='editModal-right' style={{ gridTemplateRows: `repeat(auto-fill, ${design === 'line' ? '96px' : '160px'})` }}>
                  {designType.find((item) => item.type === design).boxes.map((box, index) => designType.find((item) => item.type === design).renderBox(box, index))}
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
