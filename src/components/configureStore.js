import { configureStore } from '@reduxjs/toolkit';
import addHomeSlice from './add_home/addHomeSlice';
import loginReducer from './login/loginSlicer';
import signupReducer from './signup/signupSlicer';
import deleteHomeSlice from './delete_home/deleteHomeSlice';
import homeSlice from './home/HomeSlice';
import reservationSlice from './reservation/reservationSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    newHome: addHomeSlice,
    deleteHome: deleteHomeSlice,
    home: homeSlice.reducer,
    reservation: reservationSlice,
  },
});

export default store;
