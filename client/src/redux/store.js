import { configureStore } from '@reduxjs/toolkit';
// import logger from "redux-logger";
import UserSlice from './userSlice';
import ButtonSlice from './buttonSlice';

const store = configureStore({
  reducer: {
    user: UserSlice,
    btn: ButtonSlice,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
