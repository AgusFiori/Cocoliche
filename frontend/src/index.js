import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
// Importing Sass with Bootstrap CSS
import './App.scss';
import store from './redux/reducers/rootReducer'
import firebase from 'firebase'

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCh_2wXwWjDBtutpYaJoq7w3NqF2JnMdAE",
  authDomain: "cocoliche-306717.firebaseapp.com",
  projectId: "cocoliche-306717",
  storageBucket: "cocoliche-306717.appspot.com",
  messagingSenderId: "444514934040",
  appId: "1:444514934040:web:a4e707f518d46fb0eb926d",
  measurementId: "G-KRETDG744D"
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);