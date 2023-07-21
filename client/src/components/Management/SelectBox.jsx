import React from 'react';
import 'styles/Management/SelectBox.css';

const SelectBox = ({ curMenuData, PrimaryMenuData, subMenusData, handleLinkValue }) => {
  console.log('curMenuData.link', curMenuData.link);
  return (
    <select className='link_select' defaultValue={curMenuData.link || 'infoMsg'} onChange={handleLinkValue}>
      <option disabled value='infoMsg'>
        링크할 페이지를 선택하세요
      </option>
      <option disabled>공통 페이지</option>
      <option key='main' value='main'>
        메인화면
      </option>
      <option key='login' value='login'>
        로그인
      </option>
      <option key='signup' value='signup'>
        회원가입
      </option>
      <option key='findId' value='findId'>
        아이디 찾기
      </option>
      <option disabled>사용자 추가 페이지</option>
      {subMenusData
        .filter((submenu) => submenu.parent_id === PrimaryMenuData.idx)
        .map((subMenu) => (
          <option key={subMenu.idx} value={subMenu.link}>
            {subMenu.title}
          </option>
        ))}
    </select>
  );
};

export default SelectBox;
