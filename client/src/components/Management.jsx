import React from 'react';
import { useSelector } from 'react-redux';

const Management = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <p>
        안녕하세요 <strong>{user.user_name}</strong>님
      </p>
      <div></div>
    </>
  );
};

export default Management;
