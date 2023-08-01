import React, { useEffect, useState } from 'react';
import { useMenuActions } from 'hooks/useMenu';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom"
import 'styles/Main/Nav.css';


const Nav = ({ isLoading, setIsLoading, type, windowWidth,screenSize }) => {
  const { getMenuAction } = useMenuActions();
  const { firstList, secondList } = useSelector((state) => state.menu);
  const [currentMenuIdx, setCurrentMenuIdx] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getMenuAction(setIsLoading);
  }, []);

  return (
      <div className='container'>
      {windowWidth <= 1098 || screenSize ==="tablet" || screenSize==="mobile"  ?  
      <header className='mobile_header_wrap'>
          <button>
              <FontAwesomeIcon icon={faMagnifyingGlass} className='moblie_icon' />
            </button>
          <img className="mobile_header_logo" src={logo} alt='로고' />
            <button>
              <FontAwesomeIcon icon={faBars} className='moblie_icon'/>
            </button>
      </header>
      : <header className='header_wrap' onMouseEnter={() => setCurrentMenuIdx(null)}>
        <img className="header_wrap_logo" src={logo} alt='로고' />
        <div className='header_right'>
          {logoList.map(({ id, src }) => (
            <img key={id} src={src} alt='로고' />
          ))}
          <div className='header_right_btn'>
            <button>회사소개</button>
            <button>인재채용</button>
          </div>
        </div>
      </header>}
      {screenSize ==="tablet" || screenSize==="mobile" ? null :<nav className='gnb_wrap'>
        <div className='gnb'>
          <ul>
            {firstList.map((menu) => (
              <li key={menu.idx} className={`navWrap ${menu.idx === currentMenuIdx ? 'on' : ''}`} onMouseEnter={() => setCurrentMenuIdx(menu.idx)}>
                {menu.title}
              </li>
            ))}
          </ul>
          {!isLoading&&<div className='option' onMouseEnter={() => setCurrentMenuIdx(null)}>
            <button>
              <FontAwesomeIcon icon={faBars} className='icon'  />
            </button>
            <button>
              <FontAwesomeIcon icon={faMagnifyingGlass} className='icon' />
            </button>
          </div>}
        </div>
        {type !== '편집' && (
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
                  <div className='secondList_info' key={menu.idx} onClick={()=>navigate(`/pages/${menu.link}`)} onMouseEnter={() => setCurrentMenuIdx(menu.parent_id)}>
                    {menu.title}
                  </div>
                ))}
            </div>
          </div>
        )}
      </nav>}
    </div>
  );
};

export default Nav;

const logo = "https://cache.wjthinkbig.com/WEB_RESOURCE/WJBOOKCLUB/images/layout_2023/logo.png"

const logoList = [
  { id: '1', src: "https://cache.wjthinkbig.com/WEB_RESOURCE/WJBOOKCLUB/images/layout_2023/img_optionNavi1.png" },
  { id: '2', src: "https://cache.wjthinkbig.com/WEB_RESOURCE/WJBOOKCLUB/images/layout_2023/img_optionNavi2.png"},
  { id: '3', src: "https://cache.wjthinkbig.com/WEB_RESOURCE/WJBOOKCLUB/images/layout_2023/img_optionNavi3.png" },
];
