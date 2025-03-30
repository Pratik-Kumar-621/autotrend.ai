import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    ),
  }),
};

const app =
  getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];
const auth = getAuth(app);

export { auth };
