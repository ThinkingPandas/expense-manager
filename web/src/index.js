import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import stores from './stores/index.stores.js';
import Routes from './routes.js';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Provider {...stores}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
