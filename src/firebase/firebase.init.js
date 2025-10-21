// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDliBGg56j4PFkpm9Wnc1VaPnw9ZEoqvxY",
  authDomain: "vertex-for-bcs-116.firebaseapp.com",
  projectId: "vertex-for-bcs-116",
  storageBucket: "vertex-for-bcs-116.firebasestorage.app",
  messagingSenderId: "960006696417",
  appId: "1:960006696417:web:5e69eadbfbe2e5919876a0",
  measurementId: "G-S6G247E2DJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;