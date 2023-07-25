import React, { useState } from 'react';
import 'styles/Management/SelectBox.css';

const SelectBox = ({ type, link, curMenuData, secondList, editedLink, handleLinkChange }) => {
  const [isToggle, setIsToggle] = useState(false);

  const parent_id = curMenuData ? (curMenuData.parent_id ? curMenuData.parent_id : curMenuData.idx) : null;

  const filteredLink = secondList?.find((item) => item.link === link || item.link === editedLink);
  const commonLink = common?.find((item) => item.link === link || item.link === editedLink);

  const resultTitle = filteredLink?.title || commonLink?.title || '링크할 페이지를 선택하세요';

  const toggle = () => {
    setIsToggle((isToggle) => !isToggle);
  };

  console.log('link', link, 'editedLink', editedLink);
  const handleButtonClick = (e, value) => {
    e.stopPropagation();
    const name = type === '복제' ? 'link' : 'editedLink';
    handleLinkChange({ target: { name, value } });
    setIsToggle(false);
  };

  return (
    <ul className='list_select_option' onClick={toggle}>
      <li className={`selected_option ${isToggle ? 'open' : ''}`}>{resultTitle}</li>
      <div className={`select_option_wrap ${isToggle ? 'open' : ''}`}>
        <li className='disabled_option'>공통 페이지</li>
        {common.map((list) => (
          <li className='select_option' key={list.id} onClick={(e) => handleButtonClick(e, list.link)}>
            {list.title}
          </li>
        ))}
        <li className='disabled_option'>사용자 추가 페이지</li>
        {type === '복제'
          ? secondList.map((subMenu) => (
              <li className='select_option' key={subMenu.idx} onClick={(e) => handleButtonClick(e, subMenu.link)}>
                {subMenu.title}
              </li>
            ))
          : secondList
              .filter((submenu) => submenu.parent_id === parent_id)
              .map((subMenu) => (
                <li className='select_option' key={subMenu.idx} onClick={(e) => handleButtonClick(e, subMenu.link)}>
                  {subMenu.title}
                </li>
              ))}
      </div>
    </ul>
  );
};

export default SelectBox;

const common = [
  { id: '2412343', link: '/main', title: '메인화면' },
  { id: 's2132', link: '/login', title: '로그인' },
  { id: '565373', link: '/signup', title: '회원가입' },
  { id: '09042385', link: '/findId', title: '아이디 찾기' },
];
