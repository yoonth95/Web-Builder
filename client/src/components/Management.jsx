import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import 'styles/menu.css';

import logo from 'assets/images/logo.svg';

const Management = () => {
  const { user } = useSelector((state) => state.user);
  const [firstList, setFirstList] = useState([]);
  const [secondList, setSecondList] = useState([]);

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

  return (
    <>
      <img src={logo} alt='로고 이미지' />
      <p>
        안녕하세요 <strong>{user.user_name}</strong>님
      </p>
      <div>
        {firstList.map((menu) => (
          <div key={menu.idx}>
            <div className='primaryMenus'>
              <span className='box'>버튼1</span>
              <h1 className='box'>{menu.title}</h1>
              <div className='box'>
                <span>버튼2</span>
                <span>버튼3</span>
              </div>
            </div>
            <div>
              {secondList
                .filter((submenu) => submenu.parent_id === menu.idx)
                .map((submenu) => (
                  <div key={submenu.idx} className='subMenus'>
                    <h2 className='box'>{submenu.title}</h2>
                    <div className='box'>
                      <span>버튼2</span>
                      <span>버튼3</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Management;
