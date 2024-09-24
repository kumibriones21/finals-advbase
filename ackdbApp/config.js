const firebase = require('firebase/app');
const fireStore = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyA5tCmQZb6LqPuUgmzPM3lPN9-HVDDQENs",
  authDomain: "fir-briones.firebaseapp.com",
  projectId: "fir-briones",
  storageBucket: "fir-briones.appspot.com",
  messagingSenderId: "846276553553",
  appId: "1:846276553553:web:59da1ce8351fb86e1d8170",
  measurementId: "G-MGRB3R76PC"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = fireStore.getFirestore(firebaseApp);

module.exports = db;