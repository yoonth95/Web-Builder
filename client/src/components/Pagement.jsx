import React, { useEffect, useState } from 'react';
import 'styles/pagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBtn } from 'redux/buttonSlice';

const Pagement = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageList, setPageList] = useState([]);
  const [parentList, setParentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const Page = 3;
  
  const getMenu = async () => {
    try {
      const res = await fetch('/api/getMenu', {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) {
        console.log('get Page failed');
        return;
      }
      const data = await res.json();
      setPageList(data.filter((e) => e.parent_id).sort((a, b) => a.parent_id - b.parent_id));

      setParentList(data.filter((e) => e.parent_id == null));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMenu();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageItems = () => {
    const Last = currentPage * Page;
    const First = Last - Page;
    return pageList.slice(First, Last);
  };

  const totalPages = Math.ceil(pageList.length / Page);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const dateFormat = (updatedAt) => {
    const updatedAtDate = new Date(updatedAt);
    return updatedAtDate.toISOString().slice(0, 19).replace('T', ' ');
  };
  const search = () => {
    const filteredList = pageList.filter((item) =>
      item.title.includes(searchValue)
    );
    setPageList(filteredList);
    if (searchValue === '') {
      getMenu();
    }
  }
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <div className='board-wrap'>
      <div className='board-title'>
        <div id='SearchBox'>
          <input type='text' placeholder='페이지명' id='SearchContent'  value={searchValue} onChange={handleInputChange}/>
          <button id='Search-btn' onClick={() => search()}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
      <div className='board-list-wrap'>
        <div className='board-list'>
          <div className='top'>
            <div className='top_content'>페이지명</div>
            <div className='top_content'>페이지 경로</div>
            <div className='top_content'>메뉴</div>
            <div className='top_content'>업데이트 일시</div>
            <div className='top_content'>관리</div>
          </div>
          {getPageItems().length === 0 ? (
            <div>목록이 없습니다</div>
          ) : getPageItems().map((menu) => {
            return (
              <div key={menu.idx} className='info'>
                <div className='info_content'>{menu.title}</div>
                <div className='info_content link'>{menu.link}</div>
                <div className='info_content btn'>
                  {parentList.filter((e) => e.idx === menu.parent_id)[0].title}
                </div>
                <div className='info_content date'>
                  {dateFormat(menu.updated_at)}
                </div>
                <div className='info_content' id='info_btn'>
                  <button onClick={() => {setIsOpen(true); dispatch(setBtn('복제'));}}>복제</button>
                  <button onClick={() => navigate('/')}>편집</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='board-page'>
            <button
            className='back_btn'
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            >
            이전
            </button>
            {pageNumbers.map((pageNumber) => (
            <button
                key={pageNumber}
                className={`back_btn ${pageNumber === currentPage ? 'active' : ''}`}
                onClick={() => handlePageChange(pageNumber)}
            >
                {pageNumber}
            </button>
            ))}
            <button
            className='back_btn'
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            >
            다음
            </button>
      </div>
    </div>
  );
};

export default Pagement;
