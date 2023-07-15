import React from 'react';

import useAuth from 'hooks/useAuth';

import Login from 'components/Login';
import Management from 'components/Management';
import { useSelector } from 'react-redux';

const Main = () => {
  const { loading } = useAuth();
  const { user } = useSelector((state) => state.user);

  if (loading) {
    return null;
  }

  return <>{!user ? <Login /> : <Management />}</>;
};

export default Main;
