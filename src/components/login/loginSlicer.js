import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loginRequest = createAsyncThunk(
    'login/loginRequest', async(data) => {
        const response = await axios.post('http://localhost:5000/login', data);
        return response.data;
    }

)

const initialState = {
    login: false,
    token: null,
    error: false,
    loading: false,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(loginRequest.pending, (state) => {
        const newState = { ...state, loading: true };
        return newState;
      });
      builder.addCase(loginRequest.fulfilled, (state, action) => {
        const newState = { ...state, loading: false, login: true, token: action.payload.token};
        return newState;
      });
      builder.addCase(loginRequest.rejected, (state) => {
        const newState = { ...state, loading: false, error: true };
        return newState;
      });
    },
  });

export default loginSlice.reducer;
