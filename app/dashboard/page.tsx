"use client";

import { useAuth } from "@/lib/auth-context";
import LoadingScreen from "../(landing)/_components/LoadingScreen";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { loadingAuth, user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  console.log(posts);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Retrieve token from local storage
    console.log("Token", token);

    if (!token) {
      redirect("/"); // Redirect to "/" if no token is found
    }
    const fetchPosts = async () => {
      let isMounted = true; // Prevent state update on unmount

      try {
        if (!user) {
          throw new Error("User is not authenticated");
        }
        const response = await fetch("/api/post/save", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response:", response);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        if (isMounted) {
          setPosts(data);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        if (isMounted) {
          setError(err.message);
        }
      }

      // Cleanup on unmount
      return () => {
        isMounted = false;
      };
    };

    if (user) {
      fetchPosts();
    }
  }, [user]);
  return (
    <>
      {loadingAuth ? (
        <LoadingScreen />
      ) : (
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex items-center">
                  <h1 className="text-xl font-semibold">Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-700">
                    Welcome, {user?.displayName || "User"}
                  </span>
                  <button
                    onClick={logout}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-lg font-medium">Your Dashboard Content</h2>
              <p className="mt-4 text-gray-600">
                This is your protected dashboard page. Add your content here.
              </p>
              {error && <p style={{ color: "red" }}>Error: {error}</p>}
            </div>
          </main>
        </div>
      )}
    </>
  );
}
