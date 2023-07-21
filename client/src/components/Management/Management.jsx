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
import PrimaryMenu from './PrimaryMenu';

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
      updated_at: new Date().toISOString(),
    };

    const updateFetch = async () => {
      try {
        UpdateMenuAPI(formData);
        alert('수정 완료');

        const updatedFirstList = firstList.map((item) => (item.idx === id ? { ...item, ...formData } : item));
        dispatch(updateFirstList(updatedFirstList));
        const updatedSecondList = secondList.map((item) => (item.idx === id ? { ...item, ...formData } : item));
        dispatch(updateSecondList(updatedSecondList));
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

  const editMenu = (id, title, link) => {
    setEditMenuIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((editId) => editId !== id);
      } else {
        setEditedTitle(title);
        setEditedLink(link);
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
            <PrimaryMenu
              isNewWindow={isNewWindow}
              handleNewWindowValue={handleNewWindowValue}
              handleTitleValue={handleTitleValue}
              handleLinkValue={handleLinkValue}
              updateMenu={updateMenu}
              secondList={secondList}
              editMenuIds={editMenuIds}
              menu={menu}
              toggleImage={toggleImage}
              clickId={clickId}
              editMenu={editMenu}
              deleteMenu={deleteMenu}
            />
            {clickId.includes(menu.idx) && (
              <>
                <SubMenu
                  isNewWindow={isNewWindow}
                  handleNewWindowValue={handleNewWindowValue}
                  handleTitleValue={handleTitleValue}
                  handleLinkValue={handleLinkValue}
                  updateMenu={updateMenu}
                  PrimaryMenuData={menu}
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
