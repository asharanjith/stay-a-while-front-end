import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './home/HomeSlice';

const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
    // add reducers here
  },
});

export default store;
