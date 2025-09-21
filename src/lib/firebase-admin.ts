import { initializeApp, getApps, App, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { credential } from "firebase-admin";

let app: App;

if (!getApps().length) {
  app = initializeApp({
    credential: credential.applicationDefault(),
    databaseURL: "https://code-ai-fcd40.firebaseio.com",
    projectId: "code-ai-fcd40",
    storageBucket: "code-ai-fcd40.appspot.com",
    authDomain: "code-ai-fcd40.firebaseapp.com",
  });
} else {
  app = getApp();
}

const auth = getAuth(app);

export { app, auth };
