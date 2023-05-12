import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const LIST_RESERVATIONS = 'stayAWhile/list_reservations';
const CREATE_RESERVATION = 'stayAWhile/create_reservation';
const DELETE_RESERVATION = 'stayAWhile/delete_reservation';
const baseUrl = 'http://127.0.0.1:3000/reservations';

export const getListReservations = createAsyncThunk(LIST_RESERVATIONS, async (token) => {
  try {
    const options = {
      method: 'GET',
      url: baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.request(options);
    const responseData = response.data;
    const reservationList = responseData.data.reservations;
    return reservationList;
  } catch (error) {
    throw new Error('Failed to fetch reservations list');
  }
});

export const createReservation = createAsyncThunk(CREATE_RESERVATION,
  async ({ token, reservationData }) => {
    try {
      const options = {
        method: 'POST',
        url: baseUrl,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: reservationData,
      };
      const response = await axios.request(options);
      const responseData = response.data;
      const createdReservation = responseData.data;
      return createdReservation;
    } catch (error) {
      throw new Error('Failed to create reservation');
    }
  });

export const deleteReservation = createAsyncThunk(DELETE_RESERVATION,
  async ({ token, reservationId }) => {
    try {
      const options = {
        method: 'DELETE',
        url: `${baseUrl}/${reservationId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.request(options);
      const responseData = response.data;
      const deletedReservation = responseData.data;
      return deletedReservation;
    } catch (error) {
      throw new Error('Failed to delete reservation');
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
        state.loading = true;
      })
      .addCase(getListReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = action.payload;
      })
      .addCase(getListReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations.push(action.payload);
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteReservation.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = state.reservations.filter(
          (reservation) => reservation.id !== action.payload.id,
        );
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reservationSlice;
