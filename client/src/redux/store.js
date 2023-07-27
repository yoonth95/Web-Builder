import { configureStore } from '@reduxjs/toolkit';
// import logger from "redux-logger";
import UserSlice from './userSlice';
import ButtonSlice from './buttonSlice';
import menuSlice from './menuSlice';
import selectBoxSlice from './selectBoxSlice';

const store = configureStore({
  reducer: {
    user: UserSlice,
    btn: ButtonSlice,
    menu: menuSlice,
    selectBox: selectBoxSlice
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
