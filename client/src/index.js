import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import App from './components/App';
import App2 from './components/App2';
import App3 from './components/App3';
import './index.css';

import { Provider } from 'mobx-react'
import mainStore from './store/mainStores'
import authStore from './store/authStores'

const stores = {
  mainStore,
  authStore
}
window._____APP_STATE_____ = stores

render((
  <Provider {...stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

