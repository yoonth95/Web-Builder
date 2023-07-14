import { configureStore } from '@reduxjs/toolkit';
// import logger from "redux-logger";
import UserSlice from './userSlice';

const store = configureStore({
  reducer: {
    user: UserSlice,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
