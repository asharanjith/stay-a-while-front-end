import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  homeStayData: null,
  success: false,
  error: '',
  response: null,
};

export const addHome = createAsyncThunk('home/addHome', async (homeStayData, thunkAPI) => {
  const postURL = 'http://127.0.0.1:3000/home_stays';
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2ODM3OTc4ODJ9.wIAugPKDALaJtz6907aIRTgXt0p2sYkKvNAzXCMQubc';
  const requestContent = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(postURL, homeStayData, requestContent);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
});

const addHomeSlice = createSlice({
  name: 'homeStayData',
  initialState,
  reducers: {
    // add reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(addHome.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(addHome.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        success: true,
        response: action.payload,
      }))
      .addCase(addHome.rejected, (state, action) => ({
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      }));
  },
});

export default addHomeSlice.reducer;
