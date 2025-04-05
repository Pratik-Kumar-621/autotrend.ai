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

const authorize = async (request: Request) => {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer"))
    throw new Error("Unauthorized: Missing or Invalid Auth Header");
  const token = authHeader.split(" ")[1];
  if (!token) throw new Error("Missing Token");
  try {
    const decodedToken = await auth.verifyIdToken(token);
    if (!decodedToken) throw new Error("Unauthorized: Invalid Token");
    return {
      type: "Success",
      userId: decodedToken.uid,
    };
  } catch (error: any) {
    return {
      type: "Error",
      message: error.message,
    };
  }
};

export { auth, authorize };
