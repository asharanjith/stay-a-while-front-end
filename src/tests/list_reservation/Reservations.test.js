import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { render, act, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import reservationSlice, { getListReservations } from '../../components/reservation/reservationSlice';
import Reservations from '../../components/reservation/Reservations';
import reservations from './reservations.json';
import homeSlice, { fetchHomeStays } from '../../components/home/HomeSlice';

jest.mock('axios');

const store = configureStore({
  reducer: {
    reservation: reservationSlice,
    home: homeSlice.reducer,
  },
});

describe('Reservations', () => {
  beforeEach(async () => {
    axios.get.mockResolvedValue({
      reservations: reservations.data.reservation,
    });

    await act(async () => {
      store.dispatch(getListReservations());
      store.dispatch(fetchHomeStays());
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <Reservations />
        </Provider>,
      );
    });
  });

  test('should have a submit button', () => {
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  test('should match screenshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Reservations />
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('it should have an image of home stay', () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
