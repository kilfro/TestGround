import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAravVq99I1i0iKRMBexu8QNccyOrw9L88",
    authDomain: "testground-2a096.firebaseapp.com",
    databaseURL: "https://testground-2a096.firebaseio.com",
    projectId: "testground-2a096",
    storageBucket: "testground-2a096.appspot.com",
    messagingSenderId: "683506407251",
    appId: "1:683506407251:web:43b80862725092d6e8f3a6",
    measurementId: "G-CX1T1GHWKH"
};

export const FirebaseApp = firebase.initializeApp(firebaseConfig);