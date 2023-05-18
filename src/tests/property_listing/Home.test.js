import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { Provider, useSelector } from 'react-redux';
import { render, act, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import homeSlice, { fetchHomeStays } from '../../components/home/HomeSlice';
import homestays from '../delete_homeStay/home_stays.json';
import Home from '../../components/home/Home';

jest.mock('axios');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
  },
});
describe('Home', () => {
  beforeEach(async () => {
    axios.get.mockResolvedValue({
      data: {
        data: {
          home_stays: homestays.data.home_stays,
        },
      },
    });
    useSelector.mockImplementation((selectorFn) => selectorFn({
      home: { listings: homestays.data.home_stays },
    }));
    await act(() => {
      store.dispatch(fetchHomeStays());
    });
    await act(async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </Provider>,
      );
    });
  });
  test('should match screenshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('should have a image', () => {
    expect(screen.getAllByAltText('Home by Sam')).toHaveLength(1);
  });
});
