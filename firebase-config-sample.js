
// firebase-config-sample.js
// Replace the config object below with your Firebase project's config.
// To obtain it: Firebase Console -> Project Settings -> Your apps -> SDK setup and configuration
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

// Initialize Firebase (compat)
if(typeof firebase !== 'undefined'){
  try{ firebase.initializeApp(firebaseConfig); }catch(e){ console.warn('Firebase init error',e); }
} else {
  console.warn('Firebase SDK not loaded - live features will not work until you add SDKs.');
}
