import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import AuthContextProvider from './context/auth-context';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <AuthContextProvider>
    <Provider store={store}>
      <App/>
    </Provider>
  </AuthContextProvider>,
  document.getElementById('root')
);
