import React from 'react';
import useUserLogin from 'hooks/useUserLogin';
import Login from 'components/Login';
import Management from 'components/Management';

const Main = () => {
  const isLogin = useUserLogin();

  return <>{!isLogin ? <Login /> : <Management />}</>;
};

export default Main;
