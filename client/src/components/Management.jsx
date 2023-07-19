import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { setBtn } from 'redux/buttonSlice';
import { updateFirstList, updateSecondList } from 'redux/menuSlice';
import SelectBox from './SelectBox';

import 'styles/menu.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faGear, faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';

const Management = ({ setIsOpen }) => {
  const { firstList, secondList } = useSelector((state) => state.menu);

  const [clickId, setClickId] = useState([]);
  const [editMenuIds, setEditMenuIds] = useState([]);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedLink, setEditedLink] = useState('');
  const [isNewWindow, setIsNewWindow] = useState({});
  const dispatch = useDispatch();

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

        let f_list = [], s_list = [];
        data.forEach((item) => {
          !item.parent_id ? f_list.push(item) : s_list.push(item);
        });

        dispatch(updateFirstList(f_list));
        dispatch(updateSecondList(s_list));
      } catch (err) {
        console.error(err);
      }
    };

    getMenu();
  }, [dispatch]);

  // 메뉴 drop down
  const toggleImage = (id) => {
    if (clickId.includes(id)) {
      setClickId((prevClickId) =>
        prevClickId.filter((clickedId) => clickedId !== id),
      );
    } else {
      setClickId((prevClickId) => [...prevClickId, id]);
    }
  };

  const handleTitleValue = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleLinkValue = (e) => {
    setEditedLink(e.target.value);
  };
  const handleNewWindowValue = (e, menuId) => {
    const { checked } = e.target;
    setIsNewWindow((prevIsNewWindow) => ({
      ...prevIsNewWindow,
      [menuId]: checked,
    }));
  };

  // 메뉴 수정
  const updateMenu = (e, id) => {
    e.preventDefault();

    const formData = {
      title: editedTitle,
      link: editedLink,
      newWindow: isNewWindow[id] || false,
    };

    const updateFetch = async () => {
      try {
        const res = await fetch(`/api/updateMenu`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const data = await res.json();
        if (!res.ok) console.log(res.error);
        alert(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (window.confirm('해당 메뉴를 수정 하시겠습니까?')) updateFetch();

    console.log(formData);
  };

  // 메뉴 삭제
  const deleteMenu = (id, order_num, parent_id) => {
    const deleteMenu = async () => {
      const isParent = firstList.filter(e => e.idx === id).length > 0 ? true : false;
      try {
        const res = await fetch(`/api/deleteMenu/${id}_${isParent}_${order_num}_${parent_id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const data = await res.json();

        alert(data);
        if (!res.ok) console.log(res.error);
        else {
          const newFirstList = firstList.filter((item) => item.idx !== id);
          const newSecondList = secondList.filter((item) => item.idx !== id);
          dispatch(updateFirstList(newFirstList));
          dispatch(updateSecondList(newSecondList));
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (window.confirm('해당 메뉴를 삭제 하시겠습니까?')) deleteMenu();
  };

  const editMenu = (id) => {
    setEditMenuIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((editId) => editId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  return (
    <div className='wrap'>
      <div className='memu_title_wrap'>
        <div className='menu_title'>
          <p>메뉴 설정</p>
          <p>메뉴 항목과 구조를 설정해주세요.</p>
        </div>
        <button onClick={() => { setIsOpen(true); dispatch(setBtn('메뉴')); }}>
          메뉴 항목 추가
        </button>
      </div>
      <div className='menu_list_wrap'>
        {firstList.map((menu) => (
          <div key={menu.idx} className='menu_list'>
            <div className='primaryMenus_wrap'>
              <div className={`primaryMenus ${editMenuIds.includes(menu.idx) ? 'withEdit' : ''}`}>
                <div className='img_wrap' onClick={() => toggleImage(menu.idx)}>
                  <span style={{transform: clickId.includes(menu.idx) ? 'rotate(90deg)' : 'rotate(0deg)',}}>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </span>
                </div>
                <h1>{menu.title}</h1>
                <div className='box'>
                  <span onClick={() => {editMenu(menu.idx)}}>
                    <FontAwesomeIcon icon={faGear} />
                  </span>
                  <span onClick={() => deleteMenu(menu.idx, menu.order_num)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </span>
                </div>
              </div>
              {editMenuIds.includes(menu.idx) && (
              <form className='edit_wrap' onSubmit={(e) => updateMenu(e, menu.idx)}>
                <label className='primaryMenu_label primaryMenu_title_label' htmlFor='primaryMenu_title'>
                  제목
                  <input
                    id='primaryMenu_title'
                    type='text'
                    defaultValue={menu.title}
                    onChange={handleTitleValue}
                  />
                </label>
                <div className='edit_wrap_sub'>
                  <label className='primaryMenu_label link_label' htmlFor='primaryMenu_link'>
                    링크
                    <SelectBox curMenuData={menu} subMenusData={secondList} handleLinkValue={handleLinkValue}/>
                  </label>
                  <input
                    type='checkbox'
                    name='isNewWindow'
                    id={`primaryMenu_chkBox_${menu.idx}`}
                    className='new_window_chkBox'
                    checked={isNewWindow[menu.idx] || false}
                    onChange={(e) => handleNewWindowValue(e, menu.idx)}
                  />
                  <label htmlFor={`primaryMenu_chkBox_${menu.idx}`} className='txt_new_window'>새 창 열기</label>
                  <button className='save_btn' type='submit'>저장</button>
                </div>
              </form>
              )}
            </div>
            {clickId.includes(menu.idx) && (
              <div>
                {secondList
                  .filter((submenu) => submenu.parent_id === menu.idx)
                  .map((submenu) => (
                    <div className='subMenus_wrap' key={submenu.idx}>
                      <div className={`subMenus ${editMenuIds.includes(submenu.idx) ? 'withEdit' : ''}`}>
                        <h1 className='sub_box'>{submenu.title}</h1>
                        <div className='box'>
                          <span onClick={() => editMenu(submenu.idx)}>
                            <FontAwesomeIcon icon={faGear} />
                          </span>
                          <span onClick={() => deleteMenu(submenu.idx, submenu.order_num, submenu.parent_id)}>
                            <FontAwesomeIcon icon={faXmark} />
                          </span>
                        </div>
                      </div>
                      {editMenuIds.includes(submenu.idx) && (
                        <form className='edit_wrap' onSubmit={(e) => updateMenu(e, submenu.idx)}>
                          <label className='subMenu_label subMenu_title_label' htmlFor='subMenu_title'>
                            제목
                            <input
                              id='subMenu_title'
                              type='text'
                              defaultValue={submenu.title}
                              onChange={handleTitleValue}
                            />
                          </label>
                          <div className='edit_wrap_sub'>
                            <label className='subMenu_label link_label' htmlFor='subMenu_link'>
                              링크
                              <SelectBox curMenuData={menu} subMenusData={secondList} handleLinkValue={handleLinkValue}/>
                            </label>
                            <input
                              type='checkbox'
                              name='isNewWindow'
                              id={`subMenu_chkBox_${submenu.idx}`}
                              className='new_window_chkBox'
                              checked={isNewWindow[submenu.idx] || false}
                              onChange={(e) => handleNewWindowValue(e, submenu.idx)}
                            />
                            <label htmlFor={`subMenu_chkBox_${submenu.idx}`} className='txt_new_window'>새 창 열기</label>
                            <button className='save_btn' type='submit'>저장</button>
                          </div>
                        </form>
                      )}
                    </div>
                  ))}
                <div className='subMenus addSubMenu' onClick={() => {setIsOpen(true); dispatch(setBtn(`추가${menu.idx}`));}}>
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Management;
