import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
/* eslint-disable */
import $ from 'jquery';
import Popper from 'popper.js';
/* eslint-enable */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';


import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './components/configureStore';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />

      </Provider>
    </BrowserRouter>
  </React.StrictMode>,

);
