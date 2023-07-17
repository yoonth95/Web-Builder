import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import 'styles/menu.css';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import { faAngleRight } from "@fortawesome/free-regular-svg-icons";

import arrow_img from 'assets/images/arrow.svg';
import close_img from 'assets/images/close.svg';
import setting_img from 'assets/images/setting.svg';

const Management = () => {
  const { user } = useSelector((state) => state.user);
  const [firstList, setFirstList] = useState([]);
  const [secondList, setSecondList] = useState([]);
  const [isClosed, setIsClosed] = useState(true);
  const [clickId, setClickId] = useState([]);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const res = await fetch('/api/getMenu', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) { 
          console.log('get menu fail');
          return;
        }

        const data = await res.json();
        data.forEach((item) => {
          !item.parent_id
            ? setFirstList((prev) => [...prev, item])
            : setSecondList((prev) => [...prev, item]);
        });
      } catch (err) {
        console.error(err);
      }
    };
    
    getMenu();
  }, []);

  
  const toggleImage = (id) => {
    if (isClosed) {
      setClickId(id)
      setIsClosed(false)
    } else {
      setClickId("");
      setIsClosed(true)
    }
  };

  console.log(clickId)
  return (
    <div className='wrap'>
    <div className='memu_title_wrap'>
      <div className='menu_title'>
        <p>메뉴 설정</p>
        <p>메뉴 항목과 구조를 설정해주세요.</p>
      </div>
      <button>메뉴 항목 추가</button>
    </div>
      <div className="menu_list_wrap">
        {firstList.map((menu) => (
          <div key={menu.idx} className="menu_list">
            <div className='primaryMenus'>
              <div className="img_wrap">
                {/* <span style={{ transform: clickId.includes(menu.idx) ? 'rotate(90deg)' : 'rotate(0deg)' }} onClick={()=>toggleImage(menu.idx)}><FontAwesomeIcon icon={faAngleRight} /></span> */}
                <img src={arrow_img} style={{ transform: clickId===menu.idx ? 'rotate(90deg)' : 'rotate(0deg)' }} alt='화살표' width='42px' height='42px' onClick={()=>toggleImage(menu.idx)}/>
              </div>
              <h1>{menu.title}</h1>
              <div className='box'>
                <span>
                  <img src={setting_img} alt='셋팅' width='42px' height='42px'/>
                </span>
                <span>
                  <img src={close_img} alt='닫기' width='42px' height='42px'/>
                </span>
              </div>
            </div>
            <div className={secondList
                .map((submenu) => submenu.parent_id === clickId ) &&isClosed ? "subMenusHidden" : ""}>
              {secondList
                .filter((submenu) => submenu.parent_id === menu.idx)
                .map((submenu) => (
                  <div>
                    <div key={submenu.idx} className={ "subMenus"}>
                      <h1 className='sub_box'>{submenu.title}</h1>
                      <div className='box'>
                        <span>
                          <img src={setting_img} alt='셋팅' width='42px' height='42px'/>
                        </span>
                        <span>
                          <img src={close_img} alt='닫기' width='42px' height='42px'/>
                        </span>
                      </div>
                    </div>
                  </div> 
                ))}
              <div className='subMenus addSubMenu'>+</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Management;
