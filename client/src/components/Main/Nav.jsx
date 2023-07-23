import React, { useEffect } from 'react';
import { useMenuActions } from 'hooks/useMenu';
import logo from 'assets/images/logo.svg';
import { useSelector } from 'react-redux';

const Nav = () => {
  const { getMenuAction } = useMenuActions();
  const { firstList, secondList } = useSelector((state) => state.menu);

  useEffect(() => {
    getMenuAction();
  }, []);

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
