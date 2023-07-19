import { configureStore } from '@reduxjs/toolkit';
// import logger from "redux-logger";
import UserSlice from './userSlice';
import ButtonSlice from './buttonSlice';
import menuSlice from './menuSlice';


const store = configureStore({
  reducer: {
    user: UserSlice,
    btn: ButtonSlice,
    menu: menuSlice
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
