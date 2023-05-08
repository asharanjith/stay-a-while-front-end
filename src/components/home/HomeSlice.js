import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const DEFAULTDATA = 'stayAwhile/DEFAULTDATA';

// get property listing data...
const GetData = createAsyncThunk(DEFAULTDATA, async () => {
  const options = {
    method: 'GET',
    url: 'http://127.0.0.1:3000/home_stays',
  };
  const response = await axios.request(options);
  const propertyList = response.data;
  return propertyList;
});

// create slice...
const homeSlice = createSlice({
  name: 'homeStayList',
  initialState: {
    listing: [],
    isFulfilled: false,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetData.fulfilled, (state, action) => {
      state.isFulfilled = true;
      state.listing = action.payload;
    });
  },

});

export default homeSlice;
export { GetData };
