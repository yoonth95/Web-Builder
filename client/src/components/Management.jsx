import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import 'styles/menu.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faGear, faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";

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

  const deleteMenu = (id) => {
    const deleteMenu = async () => {
      try {
        const res = await fetch('/api/deleteMenu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ menu_idx: id }),
        });

        const data = await res.json();

        alert(data);
        if (!res.ok) console.log(res.error);
        else window.location.reload();
      } catch (err) {
        console.error(err);
      }
    };
    
    if (window.confirm('해당 메뉴를 삭제 하시겠습니까?')) deleteMenu();
  }

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
                <span style={{ transform: clickId===menu.idx ? 'rotate(90deg)' : 'rotate(0deg)' }} onClick={()=>toggleImage(menu.idx)}><FontAwesomeIcon icon={faAngleRight} /></span>
              </div>
              <h1>{menu.title}</h1>
              <div className='box'>
                <span>
                  <FontAwesomeIcon icon={faGear} />
                </span>
                <span onClick={() => deleteMenu(menu.idx)}>
                  <FontAwesomeIcon icon={faXmark} />
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
                          <FontAwesomeIcon icon={faGear} />
                        </span>
                        <span onClick={() => deleteMenu(submenu.idx)}>
                          <FontAwesomeIcon icon={faXmark} />
                        </span>
                      </div>
                    </div>
                  </div> 
                ))}
              <div className='subMenus addSubMenu'>
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Management;
