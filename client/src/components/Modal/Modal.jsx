import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { setBtn } from 'redux/buttonSlice';
import { updateFirstList, updateSecondList } from 'redux/menuSlice';
import 'styles/Modal/Modal.css';

// api
import { InsertMenuAPI } from 'api/Admin/InsertMenuAPI';

const Modal = ({ isOpen, setIsOpen }) => {
  const { btn } = useSelector((state) => state.btn);
  const { firstList, secondList } = useSelector((state) => state.menu);

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [window, setWindow] = useState(0);
  const parent_id = btn ? Number(btn.slice(2)) : null;
  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다.

  const closeModal = () => {
    if (btn === '메뉴') {
      setTitle('');
      setIsOpen(false);
    } else {
      setTitle('');
      setLink('');
      setWindow(0);
      setIsOpen(false);
    }
  };

  const handleModalContentClick = (event) => {
    event.stopPropagation();
  };

  const addMenu = () => {
    const saveParentMenu = async () => {
      if (title === '') {
        alert('페이지 명을 정해 주세요');
        return;
      }

      try {
        const data = await InsertMenuAPI(title);
        alert('메뉴를 추가하였습니다.');
        setIsOpen(false);
        setTitle('');
        dispatch(updateFirstList([...firstList, data]));
      } catch (err) {
        alert('수정 오류');
        console.log(err.message);
      }
    };

    const saveMenu = async () => {
      if (title === '' || link === '') {
        alert('페이지 명 또는 링크를 적어주세요');
        return;
      }
      try {
        const data = await InsertMenuAPI(title, link, parent_id, window);
        alert('메뉴를 추가하였습니다.');
        setIsOpen(false);
        setTitle('');
        setLink('');
        setWindow(0);
        dispatch(updateSecondList([...secondList, data]));
      } catch (err) {
        alert('수정 오류');
        console.log(err.message);
      }
    };

    if (btn === '메뉴') {
      saveParentMenu();
    } else {
      saveMenu();
    }
  };

  return (
    <>
      {isOpen && (
        <div className='modal-overlay' onClick={closeModal}>
          <div className='modal-content' onClick={handleModalContentClick}>
            <div className='modal_infor_box'>
              <span>{btn !== '메뉴' && btn !== '복제' ? '메뉴 항목 추가' : `페이지 ${btn}`}</span>
              <input type='text' className='pageInput' name='title' placeholder={btn === '메뉴' ? '메뉴 항목' : `페이지 명`} value={title} onChange={(e) => setTitle(e.target.value)} />
              {btn !== '메뉴' && <input type='text' className='pageInput' name='link' placeholder='페이지 주소' value={link} onChange={(e) => setLink(e.target.value)} />}
              {btn !== '메뉴' && (
                <div className='modal_page_infor'>
                  <p>{`http://localhost:3000/page/${link}`}</p>
                  <div style={{ display: btn === '복제' ? 'none' : 'block'}}>
                    <input type='checkbox' checked={window === 1} onChange={() => setWindow(window === 0 ? 1 : 0)} />
                    새창 열기
                  </div>
                </div>
              )}
            </div>
            <div className='modal_btn_box'>
              <button onClick={closeModal}>닫기</button>
              <button onClick={addMenu}>저장</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
