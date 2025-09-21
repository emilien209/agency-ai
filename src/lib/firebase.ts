// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type App } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-4317382558-e9dc4",
  "appId": "1:82317380821:web:d4ba15a26d07590c82265c",
  "apiKey": "AIzaSyDo6BKUbDymZg7oLhYcVNoxCAUePmJ7YH0",
  "authDomain": "studio-4317382558-e9dc4.firebaseapp.com",
  "measurementId": "G-GX4G4LNMVG",
  "messagingSenderId": "82317380821"
};

let app: App;
let auth: Auth;
let db: Firestore;
let analytics: Promise<Analytics | null>;

if (typeof window !== 'undefined' && !getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
} else if (getApps().length > 0) {
    app = getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
}

// @ts-ignore
export { app, analytics, auth, db };
