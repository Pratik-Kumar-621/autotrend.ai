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
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loadingAuth: true,
  signInWithGoogle: async () => {},
  signInWithFacebook: async () => {},
  signInWithTwitter: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoadingAuth(false);

      if (user) {
        // Get the ID token
        const idToken = await user.getIdToken();

        // Send the token to your backend to create a session
        const response = await fetch("/api/auth/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        });

        if (!response.ok) {
          console.error("Failed to create session");
        }
      } else {
        // Clear the session when user logs out
        await fetch("/api/auth/session", {
          method: "DELETE",
        });
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
      await signInWithPopup(auth, provider);
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
