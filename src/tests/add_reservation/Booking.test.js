import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import {
  render, act, screen,
} from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import homestays from '../delete_homeStay/home_stays.json';
import homeSlice from '../../components/home/HomeSlice';
import Booking from '../../components/booking/Booking';

jest.mock('axios');

const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
  },
});
describe('Booking', () => {
  beforeEach((async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Booking />
        </Provider>,
      );
    });
    axios.get.mockResolvedValue({
      data: {
        homeStayList: homestays.data.home_stays,
      },
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <Booking />
        </Provider>,
      );
    });
  }));

  test('should have a submit button', () => {
    expect(screen.getAllByRole('button', { name: /Book Now/i })).toHaveLength(2);
  });

  test('should have a h1 element with text Book A Home with Stay A While', () => {
    expect(screen.getAllByText(/Book A Home with Stay A While/i)).toHaveLength(2);
  });

  test('should match screenshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Booking />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
