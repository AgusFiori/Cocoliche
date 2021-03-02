import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Importing Sass with Bootstrap CSS
import './App.scss';
import {Provider} from 'react-redux'
import store from './redux/reducers/rootReducer'
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
