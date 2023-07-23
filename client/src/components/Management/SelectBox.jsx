import React from 'react';
import 'styles/Management/SelectBox.css';

const SelectBox = ({ curMenuData, secondList, editedLink, handleLinkChange }) => {
  const parent_id = curMenuData.parent_id ? curMenuData.parent_id : curMenuData.idx;

  return (
    <select className="link_select" defaultValue={editedLink || "infoMsg"} onChange={handleLinkChange}>
      <option disabled value="infoMsg">
        링크할 페이지를 선택하세요
      </option>
      <option disabled>공통 페이지</option>
      <option key="main" value="main">메인화면</option>
      <option key="login" value="login">로그인</option>
      <option key="signup" value="signup">회원가입</option>
      <option key="findId" value="findId">아이디 찾기</option>
      <option disabled>사용자 추가 페이지</option>
      {secondList
        .filter((submenu) => submenu.parent_id === parent_id)
        .map((subMenu) => (
          <option key={subMenu.idx} value={subMenu.link}>
            {subMenu.link}
          </option>
        ))}
    </select>
  );
};

export default SelectBox;
