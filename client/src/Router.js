import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'redux/store';

import Nav from 'components/Nav';
import Main from 'pages/Main';
import NotFound from 'pages/NotFound';

const Router = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Main />} />
          {/* <Route path='/editor:idx' element={<Modify />}/> */}
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default Router;
