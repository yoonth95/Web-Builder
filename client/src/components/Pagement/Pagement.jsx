import React, { useEffect, useState } from 'react';
import 'styles/Pagement/Pagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBtn } from 'redux/buttonSlice';
import AdminHeader from 'components/Admin/AdminHeader';

import { GetMenuAPI } from 'api/Admin/GetMenuAPI';

const Pagement = ({ setIsOpen, setIsLoading, isLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageList, setPageList] = useState([]);
  const [parentList, setParentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const Page = 5;

  const getMenu = async () => {
    setIsLoading(true);
    try {
      const data = await GetMenuAPI();
      setPageList(data.filter((e) => e.parent_id).sort((a, b) => a.parent_id - b.parent_id));
      setParentList(data.filter((e) => e.parent_id == null));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert('조회 오류');
      console.log(err.message);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  useEffect(() => {
    search();
    console.log(searchValue);
  }, [searchValue]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageItems = () => {
    const Last = currentPage * Page;
    const First = Last - Page;
    return pageList.slice(First, Last);
  };

  const totalPages = Math.ceil(pageList.length / Page);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const dateFormat = (updatedAt) => {
    const updatedAtDate = new Date(updatedAt);
    const koreanTimezoneOffset = 9 * 60;
    const koreanTime = new Date(updatedAtDate.getTime() + koreanTimezoneOffset * 60000);
    return koreanTime.toISOString().slice(0, 19).replace('T', ' ');
  };

  const search = () => {
    const lowercaseSearchValue = searchValue.toLowerCase();
    const filteredList = pageList.filter((item) => item.title.toLowerCase().includes(lowercaseSearchValue));
    setPageList(filteredList);
    if (searchValue === '') {
      getMenu();
    }
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handlesearchPress = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  return (
    <>
      <AdminHeader />
      <div className='board-wrap'>
        <div className='board-title'>
          <div id='SearchBox'>
            <input type='text' placeholder='페이지명' id='SearchContent' value={searchValue} onChange={handleInputChange} onKeyPress={handlesearchPress} />
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
              <div className='not_found_wrap'>
                <p className='not_found_text'>
                  <h1>{searchValue}</h1> 페이지는 목록에 없습니다.
                </p>
              </div>
            ) : (
              getPageItems().map((menu) => {
                return (
                  <div key={menu.idx} className='info'>
                    <div className='info_content title' title={menu.title}>
                      {menu.title}
                    </div>
                    <div className='info_content link' title={`/page/${menu.link}`}>
                      /page/{menu.link}
                    </div>
                    <div className='info_content btn'>
                      <span className='txt_info_content_btn' title={parentList.filter((e) => e.idx === menu.parent_id)[0].title}>
                        {parentList.filter((e) => e.idx === menu.parent_id)[0].title}
                      </span>
                    </div>
                    <div className='info_content date'>{dateFormat(menu.updated_at)}</div>
                    <div className='info_content' id='info_btn'>
                      <button
                        onClick={() => {
                          setIsOpen(true);
                          dispatch(setBtn('복제'));
                        }}
                      >
                        복제
                      </button>
                      <button onClick={() => navigate(`/editor/${menu.idx}`)}>편집</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className='board-page'>
          <button className='back_btn' disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            이전
          </button>
          {pageNumbers.map((pageNumber) => (
            <button key={pageNumber} className={`back_btn ${pageNumber === currentPage ? 'active' : ''}`} onClick={() => handlePageChange(pageNumber)}>
              {pageNumber}
            </button>
          ))}
          <button className='back_btn' disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            다음
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagement;
