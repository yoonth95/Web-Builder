import React, { useEffect, useState } from 'react';

// fontawsome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faImage } from '@fortawesome/free-solid-svg-icons';

import 'styles/Editor/EditorModal.css';

const designType = [
  { idx: 1, type: '이미지', numBoxs: 6 },
  { idx: 2, type: '구분선', numBoxs: 10 },
  { idx: 3, type: '목록', numBoxs: 4 },
  { idx: 4, type: '텍스트', numBoxs: 6 },
  { idx: 5, type: '표'},
  { idx: 6, type: '레이아웃', numBoxs: 6 },
];

const BlockModal = ({ isOpen, setIsOpen }) => {
  const [design, setDesign] = useState(1);
  const [numBoxes, setNumBoxes] = useState(6); // numBoxes state 추가

  const handleDesign = (id) => {
    setDesign(id);
  };

  useEffect(() => {
    const selectedDesign = designType.find((item) => item.idx === design);
    setNumBoxes(selectedDesign?.numBoxs || 6); // design이 변경될 때마다 numBoxes 갱신
  }, [design]);

  const ImageType = () => {
    return (
      <>
        {[...Array(numBoxes)].map((n, index) => {
          const numImages = index < 4 ? index + 1 : index;
          const imageClass = index < 4 ? 'imageBox' : index === 5 ? 'imageBox smallSqure' : 'imageBox largeSqure';
  
          return (
            <div key={index} className='typeBox'>
              <div className={index < 4 ? 'parentBox1' : 'parentBox2'}>
                {[...Array(numImages)].map((n, i) => (
                  <div key={i} className={imageClass}>
                    <FontAwesomeIcon icon={faImage} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <>
      {isOpen && (
        <>
          <div className='editModal-container'>
            <div className='editModal-header'>
              <h3 className='font-style1'>블록 디자인 추가</h3>
              <span style={{}} onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </div>
            <div className='editModal-main'>
              <div className='editModal-left font-style2'>
                {designType.map((item) => (
                  <p key={item.idx} className={design === item.idx ? 'designSelect' : ''} onClick={() => handleDesign(item.idx)}>
                    {item.type}
                  </p>
                ))}
              </div>
              <div className='editModal-right'>
                {/* id 값에 따른 designType 변경하기 지금은 이미지만 되어 있음 */}
                <ImageType />
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
