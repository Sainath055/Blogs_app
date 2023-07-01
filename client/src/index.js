import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './App'; 
import { reducers } from './reducers'

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider 
      clientId={"1085902388972-5roenctjprnhvjjgntuodsd845lems8u.apps.googleusercontent.com"}>
      <App />
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById('root'),
);