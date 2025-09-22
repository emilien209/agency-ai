import { initializeApp, getApps, App, getApp, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { credential } from "firebase-admin";

let app: App;

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

if (!getApps().length) {
  try {
    app = initializeApp({
      credential: credential.cert(serviceAccount),
      databaseURL: "https://code-ai-fcd40.firebaseio.com",
      projectId: "code-ai-fcd40",
      storageBucket: "code-ai-fcd40.appspot.com",
    });
  } catch (e) {
    console.error("Firebase Admin initialization error", e);
    // @ts-ignore
    app = undefined;
  }
} else {
  app = getApp();
}


const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;


export { app, auth, db };
