import { configureStore } from '@reduxjs/toolkit';
import addHomeSlice from './add_home/addHomeSlice';

const store = configureStore({
  reducer: {
    // add reducers here
    newHome: addHomeSlice,
  },
});

export default store;
