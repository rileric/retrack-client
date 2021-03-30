import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faPlus, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Auth0ProviderWithHistory from './LoginSys/auth0-provider-with-history';

library.add(faPlus, faChevronLeft);

ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
  document.getElementById('root')
);