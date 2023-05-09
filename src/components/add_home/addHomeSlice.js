import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  homeStayData: null,
  success: false,
  error: '',
  response: null,
};

export const addHome = createAsyncThunk('home/addHome', async (homeStayData) => {
  const postURL = 'http://127.0.0.1:3000/home_stays';
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5LCJleHAiOjE2ODM3MjU0NTd9.ul2mhxM_4RAALk5E2dIqqw-v4H2RVckiuiYGoAC9USM';
  const requestContent = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(postURL, homeStayData, requestContent);
  return response.data;
});

const addHomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    // add reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(addHome.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(addHome.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        success: true,
        response: action.payload,
      }))
      .addCase(addHome.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        success: false,
        error: action.error.message,
      }));
  },
});

export default addHomeSlice.reducer;
