// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSGHqXSHoXp9l7J-ZIZ1tm9uOzMxv3fCg",
  authDomain: "cins-nail-bar.firebaseapp.com",
  projectId: "cins-nail-bar",
  storageBucket: "cins-nail-bar.firebasestorage.app",
  messagingSenderId: "253469932724",
  appId: "1:253469932724:web:3c3fd0f87ebbcf31072be1",
  measurementId: "G-VJ7DW66GDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
