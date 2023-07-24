import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import useAuth from 'hooks/useAuth';

import { setUser } from 'redux/userSlice';

import Admin from 'pages/Admin';
import NotFound from 'pages/NotFound';
import Login from 'components/Login/Login';
import Signup from 'components/Login/Signup';
import Nav from 'components/Main/Nav';
import Modal from 'components/Modal/Modal';
import Editor from 'components/Editor/Editor';
import PrivateRoute from './PrivateRoute';

const Router = () => {
  const { loading, user } = useAuth();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user) dispatch(setUser(user));
  }, [user, dispatch]);

  if (loading) {
    return null;
  }

  return (
    <BrowserRouter>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin' element={
          <PrivateRoute>
            <Admin setIsOpen={setIsOpen} />
          </PrivateRoute>
        } />
        <Route path='/nav' element={<Nav />} />
        <Route path='/editor/:idx' element={<Editor />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;