// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-4317382558-e9dc4",
  "appId": "1:82317380821:web:d4ba15a26d07590c82265c",
  "apiKey": "AIzaSyDo6BKUbDymZg7oLhYcVNoxCAUePmJ7YH0",
  "authDomain": "studio-4317382558-e9dc4.firebaseapp.com",
  "measurementId": "G-GX4G4LNMVG",
  "messagingSenderId": "82317380821"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
