import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { Provider, useSelector } from 'react-redux';
import { render, act, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import reservationSlice, { getListReservations } from '../../components/reservation/reservationSlice';
import Reservations from '../../components/reservation/Reservations';
import reservations from './reservations.json';
import homeSlice, { fetchHomeStays } from '../../components/home/HomeSlice';
import homestays from '../delete_homeStay/home_stays.json';

jest.mock('axios');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const store = configureStore({
  reducer: {
    reservation: reservationSlice,
    home: homeSlice.reducer,
  },
});

describe('Reservations', () => {
  beforeEach(async () => {
    axios.get.mockResolvedValue({
      data: {
        data: {
          reservation: reservations.data.reservation,
        },
      },
    });
    useSelector.mockImplementation((selectorFn) => selectorFn({
      reservation: { reservations: reservations.data.reservation },
      home: { listings: homestays.data.home_stays },
    }));

    await act(() => {
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
    expect(screen.getAllByRole('button', { name: /Cancel/i })).toHaveLength(2);
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
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
});
