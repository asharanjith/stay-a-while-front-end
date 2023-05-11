import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:3000/home_stays';

export const getHomeStays = createAsyncThunk('home/getHomeStays', async (thunkAPI) => {
  const getURL = `${baseUrl}?my_home_stays=true`;
  const token = localStorage.getItem('token');
  const requestContent = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const respone = await axios.get(getURL, requestContent);
    return respone.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
});

export const deleteHomeId = createAsyncThunk('home/deleteHomeId', async (homeStayId, thunkAPI) => {
  const deleteURL = `${baseUrl}/${homeStayId}`;
  const token = localStorage.getItem('token');
  const requestContent = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    await axios.delete(deleteURL, requestContent);
    return homeStayId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
});

const initialState = {
  loading: false,
  homeStayData: [],
  success: false,
  error: '',
  response: null,
};

const deleteHomeSlice = createSlice({
  name: 'homeStayData',
  initialState,
  reducers: { },
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
        homeStayData: action.payload.data.home_stays,
      }))
      .addCase(getHomeStays.rejected, (state, action) => ({
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      }))
      .addCase(deleteHomeId.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(deleteHomeId.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        success: true,
        homeStayData: state.homeStayData.filter((homeStay) => homeStay.id !== action.payload),
      }))
      .addCase(deleteHomeId.rejected, (state, action) => ({
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      }));
  },
});

export default deleteHomeSlice.reducer;
