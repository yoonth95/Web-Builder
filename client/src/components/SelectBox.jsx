import React from 'react'
import 'styles/selectBox.css';

const SelectBox = ({curMenuData,subMenusData}) => {
	
	return (
		<select className='link_select' defaultValue="selectPage">
			<option disabled value="selectPage">링크할 페이지를 선택하세요</option>
			<option disabled>공통 페이지</option>
			<option key="main" value="main">메인화면</option>
			<option key="login" value="login">로그인</option>
			<option key="signup" value="signup">회원가입</option>
			<option key="findId" value="findId">아이디 찾기</option>
            <option disabled>사용자 추가 페이지</option>
            { subMenusData
            .filter((submenu) => submenu.parent_id === curMenuData.idx)
            .map((subMenu)=>{
                return (<option key={subMenu.idx} value={subMenu.title}>{subMenu.title}</option>)
            })}
		</select>
	);
};


export default SelectBox