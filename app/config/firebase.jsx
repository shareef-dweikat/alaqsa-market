import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyB41b9QaupSgCCqeSGxI42220-rkgKMj8g',
  authDomain: 'alaqsamart-9e68e.firebaseapp.com',
  databaseURL: 'https://alaqsamart-9e68e.firebaseio.com',
  projectId: 'alaqsamart-9e68e',
  storageBucket: 'alaqsamart-9e68e.appspot.com',
  messagingSenderId: '878551580351',
  appId: '1:878551580351:web:56a896b8512ce76c17900a',
  measurementId: 'G-HFMXVCYNMS',
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();