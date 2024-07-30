import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCp9PIftZUK4p78ZjZF6f1tsYucupvcAyw",
    authDomain: "clone-9bfce.firebaseapp.com",
    projectId: "clone-9bfce",
    storageBucket: "clone-9bfce.appspot.com",
    messagingSenderId: "1095923474696",
    appId: "1:1095923474696:web:a70f20c898612da58e0cbd",
    measurementId: "G-NSB4L3FMJJ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore(); // access to the firestore (realtime) database
  const auth = firebase.auth();  // access to the authentication service, variable to handle sign in

  export { db, auth }; // export the database and authentication service to be used in other files.
