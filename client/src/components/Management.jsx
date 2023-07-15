import React from 'react';
import { useSelector } from 'react-redux';

import logo from 'assets/images/logo.svg';

const Management = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <img src={logo} alt='로고 이미지' />
      <p>
        안녕하세요 <strong>{user.user_name}</strong>님
      </p>
      <div></div>
    </>
  );
};

export default Management;
