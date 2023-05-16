import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signupRequest = createAsyncThunk(
  'signup/signupRequest', async (data) => {
    const response = await axios.post('https://stay-a-while-api.onrender.com/users', data);
    return response.data;
  },
);

const initialState = {
  success: false,
  loading: false,
  error: false,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    errorReset: (state) => {
      const newState = { ...state, error: false };
      return newState;
    },
    successReset: (state) => {
      const newState = { ...state, success: false };
      return newState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupRequest.pending, (state) => {
      const newState = { ...state, loading: true };
      return newState;
    });
    builder.addCase(signupRequest.fulfilled, (state) => {
      const newState = { ...state, loading: false, success: true };
      return newState;
    });
    builder.addCase(signupRequest.rejected, (state) => {
      const newState = { ...state, loading: false, error: true };
      return newState;
    });
  },
});

export default signupSlice.reducer;
export const { errorReset, successReset } = signupSlice.actions;
