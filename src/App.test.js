import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus, faChevronLeft, faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import App from './App';

library.add(faPlus, faChevronLeft, faTrashAlt)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})