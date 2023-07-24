import React, { useState } from 'react';

// fontawsome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import 'styles/Editor/EditorModal.css';

const designType = [
  { idx: 1, type: '이미지' },
  { idx: 2, type: '구분선' },
  { idx: 3, type: '목록' },
  { idx: 4, type: '텍스트' },
  { idx: 5, type: '표' },
  { idx: 6, type: '레이아웃' },
];

const BlockModal = ({ isOpen, setIsOpen }) => {
  const [design, setDesign] = useState(1);

  const handleDesign = (id) => {
    setDesign(id);
  };

  return (
    <>
      {isOpen && (
        <>
          <div className='editModal-container'>
            <div className='editModal-header'>
              <h3 className='font-style1'>블록 디자인 추가</h3>
              <span>
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
              <div className='editModal-right'></div>
            </div>
          </div>
          <div className='editModal-overlay'></div>
        </>
      )}
    </>
  );
};

export default BlockModal;
