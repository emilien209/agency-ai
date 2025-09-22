import { initializeApp, getApps, App, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { credential } from "firebase-admin";

let app: App;

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!getApps().length) {
  try {
    if (serviceAccountString) {
      const serviceAccount = JSON.parse(serviceAccountString);
      app = initializeApp({
        credential: credential.cert(serviceAccount),
        databaseURL: "https://code-ai-fcd40.firebaseio.com",
        projectId: "code-ai-fcd40",
        storageBucket: "code-ai-fcd40.appspot.com",
      });
    } else {
      // In environments without service account info, initialize without it.
      // This is useful for client-side rendering or environments where admin access isn't needed.
      app = initializeApp({
        projectId: "code-ai-fcd40",
      });
    }
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
