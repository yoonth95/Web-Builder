// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React, { useEffect, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setBtn } from 'redux/buttonSlice';
import { updateFirstList, updateSecondList } from 'redux/menuSlice';

// 컴포넌트
import SelectBox from './SelectBox';
import NewMenu from './NewMenu';
import EditForm from './EditForm';
import SubMenu from './SubMenu';

// api
import { UpdateMenuAPI } from 'api/Admin/UpdateMenuAPI';
import { GetMenuAPI } from 'api/Admin/GetMenuAPI';
import { DeleteMenuAPI } from 'api/Admin/DeleteMenuAPI';

// css
import 'styles/Management/Management.css';

// fontawesome
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
        const data = await GetMenuAPI();

        let f_list = [];
        let s_list = [];
        data.forEach((item) => {
          !item.parent_id ? f_list.push(item) : s_list.push(item);
        });

        dispatch(updateFirstList(f_list));
        dispatch(updateSecondList(s_list));
      } catch (err) {
        alert('조회 오류');
        console.log(err.message);
      }
    };
    getMenu();
  }, [dispatch]);

  // 메뉴 drop down
  const toggleImage = (id) => {
    if (clickId.includes(id)) {
      setClickId((prevClickId) => prevClickId.filter((clickedId) => clickedId !== id));
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
  const updateMenu = async (e, id) => {
    e.preventDefault();

    const formData = {
      idx: id,
      title: editedTitle,
      link: editedLink,
      newWindow: isNewWindow[id] || false,
    };

    const updateFetch = async () => {
      try {
        UpdateMenuAPI(formData);
        alert('수정 완료');

        // update된 값으로 상태값 변환 필요
        // dispatch(updateFirstList(data));
        // dispatch(updateSecondList(data));
      } catch (err) {
        alert('수정 오류');
        console.log(err.message);
      }
    };
    if (window.confirm('해당 메뉴를 수정 하시겠습니까?')) updateFetch();

    console.log(formData);
  };

  // 메뉴 삭제
  const deleteMenu = (id, order_num, parent_id) => {
    const deleteMenu = async () => {
      const isParent = firstList.filter((e) => e.idx === id).length > 0 ? true : false;
      try {
        await DeleteMenuAPI(id, isParent, order_num, parent_id);
        alert('삭제 완료');
        const newFirstList = firstList.filter((item) => item.idx !== id);
        const newSecondList = secondList.filter((item) => item.idx !== id);
        dispatch(updateFirstList(newFirstList));
        dispatch(updateSecondList(newSecondList));
      } catch (err) {
        alert('삭제 오류');
        console.log(err.message);
      }
    };

    if (window.confirm('해당 메뉴를 삭제 하시겠습니까?')) deleteMenu();
  };

  const editMenu = (id) => {
    setEditMenuIds((prevIds) => {
      if (prevIds.includes(id)) {
        // 토글 버튼 눌렀을 때 제목과 링크 값 저장된 값으로 변환하기!
        //setEditedTitle();
        //setEditedLink();
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
        <button
          onClick={() => {
            setIsOpen(true);
            dispatch(setBtn('메뉴'));
          }}
        >
          메뉴 항목 추가
        </button>
      </div>
      <div className='menu_list_wrap'>
        {firstList.map((menu) => (
          <div key={menu.idx} className='menu_list'>
            <div className='primaryMenus_wrap'>
              <div className={`primaryMenus ${editMenuIds.includes(menu.idx) ? 'withEdit' : ''}`}>
                <div className='img_wrap' onClick={() => toggleImage(menu.idx)}>
                  <span style={{ transform: clickId.includes(menu.idx) ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </span>
                </div>
                <h1>{menu.title}</h1>
                <div className='box'>
                  <span
                    onClick={() => {
                      editMenu(menu.idx, menu.title, menu.link);
                    }}
                  >
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
                    <input id='primaryMenu_title' type='text' defaultValue={menu.title} onChange={handleTitleValue} />
                  </label>
                  <div className='edit_wrap_sub'>
                    <label className='primaryMenu_label link_label' htmlFor='primaryMenu_link'>
                      링크
                      <SelectBox curMenuData={menu} subMenusData={secondList} handleLinkValue={handleLinkValue} />
                    </label>
                    <input
                      type='checkbox'
                      name='isNewWindow'
                      id={`primaryMenu_chkBox_${menu.idx}`}
                      className='new_window_chkBox'
                      checked={isNewWindow[menu.idx] || false}
                      onChange={(e) => handleNewWindowValue(e, menu.idx)}
                    />
                    <label htmlFor={`primaryMenu_chkBox_${menu.idx}`} className='txt_new_window'>
                      새 창 열기
                    </label>
                    <button className='save_btn' type='submit'>
                      저장
                    </button>
                  </div>
                </form>
              )}
            </div>
            {clickId.includes(menu.idx) && (
              <>
                <SubMenu
                  isNewWindow={isNewWindow}
                  handleNewWindowValue={handleNewWindowValue}
                  handleTitleValue={handleTitleValue}
                  updateMenu={updateMenu}
                  menu={menu}
                  handleLinkValue={handleLinkValue}
                  secondList={secondList}
                  idx={menu.idx}
                  editMenuIds={editMenuIds}
                  editMenu={editMenu}
                  deleteMenu={deleteMenu}
                />
                <NewMenu setIsOpen={setIsOpen} dispatch={dispatch} setBtn={setBtn} idx={menu.idx} />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Management;
