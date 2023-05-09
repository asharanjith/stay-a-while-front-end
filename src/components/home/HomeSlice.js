import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const FETCH_HOME_STAYS = 'stayAwhile/FETCH_HOME_STAYS';

const fetchHomeStays = createAsyncThunk(FETCH_HOME_STAYS, async () => {
  try {
    const options = {
      method: 'GET',
      url: 'http://127.0.0.1:3000/home_stays',
    };
    const response = await axios.request(options);
    const propertyList = response.data;
    console.log(propertyList);
    return propertyList;
  } catch (error) {
    throw new Error('Failed to fetch home stays');
  }
});

const homeSlice = createSlice({
  name: 'homeStayList',
  initialState: {
    listings: [],
    isFulfilled: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHomeStays.fulfilled, (state, action) => {
      state.isFulfilled = true;
      state.listings = action.payload;
    });
    builder.addCase(fetchHomeStays.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default homeSlice;
export { fetchHomeStays };
