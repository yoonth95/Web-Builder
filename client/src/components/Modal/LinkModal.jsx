import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import 'styles/Modal/LinkModal.css';

const LinkModal = ({ block_id, idx, setIsOpen, isOpen }) => {
  const [isNoLinkChecked, setNoLinkChecked] = useState(true);
  const [isInternalLinkChecked, setInternalLinkChecked] = useState(false);
  const [isUrlChecked, setUrlChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedLink, setSelectedLink] = useState('');

  const url = `/page/${selectedLink}`;
  console.log(url);
  const { secondList } = useSelector((state) => state.menu);
  console.log(secondList);

  const handleNoLinkCheckboxChange = () => {
    setNoLinkChecked(true);
    setInternalLinkChecked(false);
    setUrlChecked(false);
  };

  const handleInternalLinkCheckboxChange = () => {
    setNoLinkChecked(false);
    setInternalLinkChecked(true);
    setUrlChecked(false);
  };

  const handleUrlCheckboxChange = () => {
    setNoLinkChecked(false);
    setInternalLinkChecked(false);
    setUrlChecked(true);
  };

  const handleOptionChange = (e) => {
    console.log(e.target.value);
    setSelectedOption(e.target.value);
    const selectedPage = secondList.find((item) => item.idx === e.target.value);
    console.log(selectedPage);
    if (selectedPage) {
      setSelectedLink(selectedPage.link);
    }
  };
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <div className='modal_infor_box'>
          <span>링크 설정</span>
        </div>
        <div className={`modal_link_check ${isNoLinkChecked ? 'checked' : ''}`} style={{ marginBottom: '30px' }}>
          <input type='checkbox' className='notUse' checked={isNoLinkChecked} onChange={handleNoLinkCheckboxChange} />
          <label className={isNoLinkChecked ? '' : 'strikethrough'}>링크 없음</label>
        </div>
        <div className={`modal_link_check ${isInternalLinkChecked ? 'checked' : ''}`} style={{ flexDirection: 'column' }}>
          <div style={{ marginBottom: '10px' }}>
            <input type='checkbox' className='notUse' checked={isInternalLinkChecked} onChange={handleInternalLinkCheckboxChange} />
            <label className={isInternalLinkChecked ? '' : 'strikethrough'}>내부 링크 페이지</label>
          </div>
          <select className='select_box' disabled={!isInternalLinkChecked} onChange={handleOptionChange}>
            <option className='first_option' value=''>
              링크할 페이지를 선택하세요
            </option>
            {secondList.map((item) => (
              <option key={item.title} value={item.idx}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div className={`modal_link_check ${isUrlChecked ? 'checked' : ''}`} style={{ flexDirection: 'column' }}>
          <div style={{ marginBottom: '10px' }}>
            <input type='checkbox' className='notUse' checked={isUrlChecked} onChange={handleUrlCheckboxChange} />
            <label className={isUrlChecked ? '' : 'strikethrough'}>URL 입력</label>
          </div>
          <input type='text' className='pageInput' placeholder='http://로 시작되는 링크 주소 입력' disabled={isNoLinkChecked} style={{ marginBottom: '40px', paddingLeft: '20px' }} />
        </div>
        <div className='modal_btn_box'>
          <button onClick={() => setIsOpen(false)}>닫기</button>
          <button>확인</button>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
