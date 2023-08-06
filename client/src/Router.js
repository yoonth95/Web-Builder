import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Admin from 'pages/Admin';
import NotFound from 'pages/NotFound';
import Editor from 'pages/Editor';
import Login from 'components/Login/Login';
import Signup from 'components/Login/Signup';
import Modal from 'components/Modal/Modal';
import AlertPopup from 'components/Modal/AlertPopup';
import Main from 'pages/Main';
import PrivateRoute from './PrivateRoute';
import Detail from 'pages/Detail/Detail';

const Router = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      <AlertPopup />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin' element={
          <PrivateRoute>
            <Admin setIsOpen={setIsOpen} isLoading={isLoading} setIsLoading={setIsLoading} />
          </PrivateRoute>
        } />
        <Route path='/main' element={<Main isLoading={isLoading} setIsLoading={setIsLoading} />} />
        <Route path='/editor/*' element={
          <PrivateRoute>
            <Editor isLoading={isLoading} setIsLoading={setIsLoading} />
          </PrivateRoute>
        } />
        <Route path='/*' element={<NotFound />} />
        <Route path='/pages/:link/:sublink?' element={<Detail isLoading={isLoading} setIsLoading={setIsLoading} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;