import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './login/loginSlicer';
import signupReducer from './signup/signupSlicer';

const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
  },
});

export default store;
