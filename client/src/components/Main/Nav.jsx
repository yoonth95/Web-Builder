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

const Nav = () => {
  const { getMenuAction } = useMenuActions();
  const { firstList, secondList } = useSelector((state) => state.menu);
  const [currentMenuIdx, setCurrentMenuIdx] = useState(null);

  const filteredSecondList = secondList.filter((menu) => firstList.some((item) => item.idx === menu.parent_id));

  useEffect(() => {
    getMenuAction();
  }, []);

  console.log(secondList);
  console.log(firstList);
  return (
    <div>
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
              <li key={menu.idx} className={`navWrap ${menu.idx === currentMenuIdx ? 'on' : ''}`} onMouseEnter={() => setCurrentMenuIdx(menu.idx)} onMouseLeave={() => setCurrentMenuIdx(null)}>
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
        <div className={`gnb_info_wrap ${currentMenuIdx !== null ? 'on' : ''}`}>
          {filteredSecondList.map((menu) => (
            <div key={menu.idx}>{menu.title}</div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
