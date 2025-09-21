// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type App } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnX-trRfc2bVaejvR0nwwVqllAtumbIso",
  authDomain: "code-ai-fcd40.firebaseapp.com",
  projectId: "code-ai-fcd40",
  storageBucket: "code-ai-fcd40.appspot.com",
  messagingSenderId: "679217755799",
  appId: "1:679217755799:web:f10309e35d131fe3285bd2",
  measurementId: "G-4VMK65N3G0"
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
