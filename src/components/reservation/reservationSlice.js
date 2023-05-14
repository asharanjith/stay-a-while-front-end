import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const LIST_RESERVATIONS = 'stayAWhile/list_reservations';
const DELETE_RESERVATION = 'stayAWhile/delete_reservation';
const baseUrl = 'http://localhost:3000/reservations';

export const getListReservations = createAsyncThunk(LIST_RESERVATIONS, async (token) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.request(baseUrl, options);
    const responseData = response.data;
    if (responseData.error) {
      throw new Error(responseData.error);
    } else {
      const reservationList = responseData.data.reservation;
      return reservationList;
    }
  } catch (error) {
    return { error: error.message };
  }
});

export const deleteReservation = createAsyncThunk(DELETE_RESERVATION,
  async (payload) => {
    const deleteUrl = `${baseUrl}/${payload.id}`;
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      };
      const response = await axios.delete(deleteUrl, options);
      const responseData = response.data;
      if (response.error) {
        throw new Error(responseData.error);
      } else {
        return responseData;
      }
    } catch (error) {
      return { error: error.message };
    }
  });

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListReservations.pending, (state) => {
        const newState = { ...state, loading: true };
        return newState;
      })
      .addCase(getListReservations.fulfilled, (state, action) => {
        const newState = { ...state, loading: false, reservations: action.payload };
        return newState;
      })
      .addCase(getListReservations.rejected, (state, action) => {
        const newState = { ...state, loading: false, error: action.error };
        return newState;
      })
      .addCase(deleteReservation.pending, (state) => {
        const newState = { ...state, loading: true };
        return newState;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        const filteredReservations = state.reservations.filter(
          (reservation) => reservation.id !== action.payload.id,
        );
        const newState = { ...state, loading: false, reservations: filteredReservations };
        return newState;
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        const newState = { ...state, loading: false, error: action.error };
        return newState;
      });
  },
});
export default reservationSlice.reducer;
