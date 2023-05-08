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

export { GetData };
