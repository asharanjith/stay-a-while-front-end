import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const FETCH_HOME_STAYS = 'stayAwhile/FETCH_HOME_STAYS';

const fetchHomeStays = createAsyncThunk(FETCH_HOME_STAYS, async (token) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://stay-a-while-api.onrender.com/home_stays',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.request(options);
    const responseData = response.data;
    const propertyList = responseData.data.home_stays;
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
