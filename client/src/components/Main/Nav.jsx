import React, { useEffect, useState } from 'react';
import { useMenuActions } from 'hooks/useMenu';
import logo from 'assets/images/logo.svg';
import Link1 from 'assets/images/Link1.svg';
import Link2 from 'assets/images/Link2.svg';
import Link3 from 'assets/images/Link3.svg';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import 'styles/Main/Nav.css';

const Nav = ({ isLoading, setIsLoading }) => {
  const { getMenuAction } = useMenuActions();
  const { firstList, secondList } = useSelector((state) => state.menu);
  const [currentMenuIdx, setCurrentMenuIdx] = useState(null);

  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  const nextImage = () => {
    setCurrentCarouselIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // 이전 이미지로 이동
  const prevImage = () => {
    setCurrentCarouselIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const images = [
    'https://online-cloud.wjthinkbig.com/contents/banner/6a3dda1d-d71a-418f-b685-87d677196e5e.jpg',
    'https://online-cloud.wjthinkbig.com/contents/banner/bcfd27f3-844e-44ff-87ed-25abea584c7a.png',
    'https://online-cloud.wjthinkbig.com/contents/banner/7aa76954-01ad-4bb9-b194-c07995a967d2.png',
    'https://online-cloud.wjthinkbig.com/contents/banner/95d4f82a-1ddf-46d9-ba7f-d570354af95d.jpg',
  ];

  useEffect(() => {
    getMenuAction(setIsLoading);
  }, []);

  useEffect(() => {
    const timer = setTimeout(nextImage, 3000); // 3초마다 다음 이미지로 넘어가도록 설정

    return () => {
      clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 정리(cleanup)
    };
  }, [currentCarouselIndex]);

  return (
    <div className='container'>
      <header className='header_wrap'>
        <img src={logo} alt='로고' />
        <div className='header_right'>
          <img src={Link1} alt='로고' />
          <img src={Link2} alt='로고' />
          <img src={Link3} alt='로고' />
          <div className='header_right_btn'>
            <button>회사소개</button>
            <button>인재채용</button>
          </div>
        </div>
      </header>
      <nav className='gnb_wrap'>
        <div className='gnb'>
          <ul>
            {firstList.map((menu) => (
              <li key={menu.idx} className={`navWrap ${menu.idx === currentMenuIdx ? 'on' : ''}`} onMouseEnter={() => setCurrentMenuIdx(menu.idx)}>
                {menu.title}
              </li>
            ))}
          </ul>
        </div>
        <div className='option'>
          <button>
            <FontAwesomeIcon icon={faBars} className='icon' />
          </button>
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='icon' />
          </button>
        </div>
        <div className={`gnb_info_wrap ${currentMenuIdx !== null ? 'on' : ''}`} onMouseLeave={() => setCurrentMenuIdx(null)}>
          {firstList
            .filter((menu) => menu.idx === currentMenuIdx)
            .map((menu) => (
              <div className='firstList_info' key={menu.idx} onMouseEnter={() => setCurrentMenuIdx(menu.idx)}>
                {menu.title}
              </div>
            ))}
          <div className='secondList_info_wrap'>
            {secondList
              .filter((menu) => menu.parent_id === currentMenuIdx)
              .map((menu) => (
                <div className='secondList_info' key={menu.idx} onMouseEnter={() => setCurrentMenuIdx(menu.parent_id)}>
                  {menu.title}
                </div>
              ))}
          </div>
        </div>
        <div className='carousel'>
          <div className='carousel-slider' style={{ transform: `translateX(-${currentCarouselIndex * 100}%)` }}>
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Image ${index + 1}`} />
            ))}
          </div>
          <div className='carousel_btn'>
            <div>
              {currentCarouselIndex + 1} / {images.length}
            </div>
            <button onClick={prevImage}>&lt;</button>
            <button onClick={nextImage}>&gt;</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
