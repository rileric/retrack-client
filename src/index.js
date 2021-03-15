import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faPlus, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

library.add(faPlus, faChevronLeft);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);