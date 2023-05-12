import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import {
  render, act, screen,
} from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import addHomeSlice from '../../components/add_home/addHomeSlice';
import AddHome from '../../components/add_home/AddHome';

jest.mock('axios');

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const store = configureStore({
  reducer: {
    addHome: addHomeSlice,
  },
});

describe('AddHome', () => {
  beforeEach((async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <AddHome />
        </Provider>,
      );
    });
  }));

  test('should have a submit button', () => {
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('should have a input field with placeholdeer "Name of the property"', () => {
    expect(screen.getByPlaceholderText(/Name of the property/i)).toBeInTheDocument();
  });

  test('should have a input field with placeholdeer "Location"', () => {
    expect(screen.getByPlaceholderText(/Location of the property/i)).toBeInTheDocument();
  });

  test('should have a input field with placeholdeer "City"', () => {
    expect(screen.getByPlaceholderText(/Description of the property/i)).toBeInTheDocument();
  });

  test('should have a input field with placeholdeer "State"', () => {
    expect(screen.getByPlaceholderText(/Price per day/i)).toBeInTheDocument();
  });

  test('should have a input field with placeholdeer "Zip"', () => {
    expect(screen.getByPlaceholderText(/Number of rooms/i)).toBeInTheDocument();
  });
});

describe('AddHome', () => {
  test('should match snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <AddHome />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
