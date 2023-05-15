import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { render, act, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import deleteHomeSlice from '../../components/delete_home/deleteHomeSlice';
import DeleteHome from '../../components/delete_home/DeleteHome';
import homestays from './home_stays.json';

jest.mock('axios');

const store = configureStore({
  reducer: {
    deleteHome: deleteHomeSlice,
  },
});

describe('DeleteHome', () => {
  beforeEach(async () => {
    axios.get.mockResolvedValue({
      data: {
        data: {
          home_stays: [homestays.data.home_stays[0]],
        },
      },
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <DeleteHome />
        </Provider>,
      );
    });
  });

  test('should have a submit button', () => {
    expect(screen.getByRole('button', { name: /Delete Home/i })).toBeInTheDocument();
  });

  test('should match screenshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <DeleteHome />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('it should have an image of home stay', () => {
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('it should have a name of home stay', async () => {
    await act(() => render(
      <Provider store={store}>
        <DeleteHome />
      </Provider>,
    ));
    const homeName = await screen.findAllByText(homestays.data.home_stays[0].name);
    expect(homeName[0]).toBeInTheDocument();
  });

  test('it should have a location of home stay', async () => {
    await act(() => render(
      <Provider store={store}>
        <DeleteHome />
      </Provider>,
    ));
    const homeLocation = await screen.findAllByText(homestays.data.home_stays[0].location);
    expect(homeLocation[0]).toBeInTheDocument();
  });
});
