import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import './index.css';
import App from './App';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCNk5F5d84NTyCP8WJ0NCLDQoRzLgJ4tfA",
    authDomain: "secret-halloween.firebaseapp.com",
    databaseURL: "https://secret-halloween.firebaseio.com",
    projectId: "secret-halloween",
    storageBucket: "secret-halloween.appspot.com",
    messagingSenderId: "258441556165",
    appId: "1:258441556165:web:87908b8393746c0cd000ac",
    measurementId: "G-43LHCHYH72"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));