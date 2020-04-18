import firebase from 'firebase';
// import firestore from 'firebase/firestore';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD-x1Da5lniyGRo7piKFOGeyMDQ1ejr-aY",
    authDomain: "home-store-app.firebaseapp.com",
    databaseURL: "https://home-store-app.firebaseio.com",
    projectId: "home-store-app",
    storageBucket: "home-store-app.appspot.com",
    messagingSenderId: "2837343105",
    appId: "1:2837343105:web:02dc9407254cb86f55d680",
    measurementId: "G-DNJJR5WG7P"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
//   const firebaseAppAnalytics = firebase.analytics();


const firestore = firebaseApp.firestore()
// console.log("init.js for firebase fired!")
//   // Init GeoFireX
//   import geofirex from 'geofirex';
//   const geo = geofirex.init(firebase);


export {firestore}
