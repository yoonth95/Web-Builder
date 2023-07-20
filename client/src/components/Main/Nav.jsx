import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateFirstList, updateSecondList } from 'redux/menuSlice';
import logo from 'assets/images/logo.svg';
import { useSelector } from 'react-redux';

const Nav = () => {
  const { firstList, secondList } = useSelector((state) => state.menu);
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

        let f_list = [];
        let s_list = [];
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

  console.log(secondList);
  return (
    <div>
      <div>
        <img src={logo} alt='로고' />
      </div>
      <div>
        {firstList.map((menu) => (
          <ul key={menu.idx}>
            {menu.title}
            <li></li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Nav;
