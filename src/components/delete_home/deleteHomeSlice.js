import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:3000/home_stays';

export const getHomeStays = createAsyncThunk('home/getHomeStays', async (homeStayData, thunkAPI) => {
  const token = localStorage.getItem('token');
  const requestContent = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(baseUrl, requestContent);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
});

export const deleteHome = createAsyncThunk('home/deleteHome', async (homeStayId, thunkAPI) => {
  const token = localStorage.getItem('token');
  const requestContent = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.delete(`${baseUrl}/${homeStayId}`, requestContent);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
});

const initialState = {
  loading: false,
  homeStayData: null,
  success: false,
  error: '',
  response: null,
};

const deleteHomeSlice = createSlice({
  name: 'homeStayData',
  initialState,
  reducers: {
    // add reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHomeStays.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getHomeStays.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        success: true,
        homeStayData: action.payload,
      }))
      .addCase(getHomeStays.rejected, (state, action) => ({
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      }))
      .addCase(deleteHome.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(deleteHome.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        success: true,
        response: action.payload,
      }))
      .addCase(deleteHome.rejected, (state, action) => ({
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      }));
  },
});

export default deleteHomeSlice.reducer;
