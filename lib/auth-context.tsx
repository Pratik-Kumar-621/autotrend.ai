"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import { redirect } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loadingAuth: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithTwitter: () => Promise<void>;
  logout: () => Promise<void>;
  token: string;
  twitterAccessToken: string;
  twitterAccessSecret: string;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loadingAuth: true,
  signInWithGoogle: async () => {},
  signInWithFacebook: async () => {},
  signInWithTwitter: async () => {},
  logout: async () => {},
  token: "",
  twitterAccessToken: "",
  twitterAccessSecret: "",
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [token, setToken] = useState("");
  const [twitterAccessToken, setTwitterAccessToken] = useState("");
  const [twitterAccessSecret, setTwitterAccessSecret] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoadingAuth(false);

      if (user) {
        // Get the ID token
        const idToken = await user.getIdToken();
        setToken(idToken);
        // Save the token to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("authToken", idToken);

          // Retrieve Twitter tokens from localStorage
          const storedTwitterAccessToken =
            localStorage.getItem("twitterAccessToken") || "";
          const storedTwitterAccessSecret =
            localStorage.getItem("twitterAccessSecret") || "";

          setTwitterAccessToken(storedTwitterAccessToken);
          setTwitterAccessSecret(storedTwitterAccessSecret);
        }
      } else {
        // Clear the session when user logs out
        setToken("");
        setTwitterAccessToken("");
        setTwitterAccessSecret("");
        if (typeof window !== "undefined") {
          localStorage.removeItem("authToken");
          localStorage.removeItem("twitterAccessToken");
          localStorage.removeItem("twitterAccessSecret");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
      throw error;
    }
  };

  const signInWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      const credential: any = TwitterAuthProvider.credentialFromResult(result);

      if (credential) {
        setTwitterAccessToken(credential.accessToken);

        setTwitterAccessSecret(credential.secret ?? "");

        if (typeof window !== "undefined") {
          localStorage.setItem("twitterAccessToken", credential.accessToken);

          localStorage.setItem("twitterAccessSecret", credential.secret ?? "");
        }
      }
    } catch (error) {
      console.error("Error signing in with Twitter:", error);
      throw error;
    }
  };

  const logout = async () => {
    setLoadingAuth(true);
    try {
      await signOut(auth);
      redirect("/");
      setToken("");
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    } finally {
      setLoadingAuth(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingAuth,
        signInWithGoogle,
        signInWithFacebook,
        signInWithTwitter,
        logout,
        token,
        twitterAccessToken,
        twitterAccessSecret,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
