import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import useAuth from 'hooks/useAuth';

import MainHeader from 'components/MainHeader';
import Management from 'components/Management';
import Pagement from 'components/Pagement';


const Main = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const { loading } = useAuth();
  const { user } = useSelector((state) => state.user);

  const query = new URLSearchParams(useLocation().search);
  const tab = query.get('tab');

  if (loading) {
    return null;
  }

  if (!user) {
    alert('로그인 해주시기 바랍니다.');
    navigate('/');
  }

  return (
    <>
      <MainHeader/>
      {(tab === 'a' || tab === null) ? <Management /> : <Pagement />}
    </>
  )
};

export default Main;
