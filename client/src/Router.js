import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from 'pages/Main';
import NotFound from 'pages/NotFound';
import Login from 'components/Login';
import Modal from 'components/Modal';

const Router = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter>
      <Modal isOpen={isOpen} />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin' element={<Main setIsOpen={setIsOpen} />} />
        {/* <Route path='/editor:idx' element={<Modify />}/> */}
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
