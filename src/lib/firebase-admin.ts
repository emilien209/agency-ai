import { initializeApp, getApps, App, getApp, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { credential } from "firebase-admin";

let app: App | undefined;

try {
    if (process.env.NODE_ENV === 'production' && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        if (!getApps().length) {
            app = initializeApp({
                credential: credential.applicationDefault(),
                databaseURL: "https://code-ai-fcd40.firebaseio.com",
                projectId: "code-ai-fcd40",
                storageBucket: "code-ai-fcd40.appspot.com",
            });
        } else {
            app = getApp();
        }
    } else if (process.env.NODE_ENV !== 'production') {
        // For non-production environments, you might use a service account file
        // or other logic. For now, we are preventing initialization if not in prod
        // to avoid ADC errors in local dev.
        if (!getApps().length) {
            // Check for a service account key, but don't require it for local dev to avoid crashing.
            // This part is now more defensive.
        } else {
            app = getApp();
        }
    }
} catch (e) {
    console.error("Firebase Admin initialization error:", e);
}


const auth = app ? getAuth(app) : null;
const db = app ? getFirestore(app) : null;


export { app, auth, db };
