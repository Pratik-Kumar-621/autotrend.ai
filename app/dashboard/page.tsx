"use client";

import { useAuth } from "@/lib/auth-context";
import LoadingScreen from "../(landing)/_components/LoadingScreen";

export default function Dashboard() {
  const { loadingAuth, user, logout } = useAuth();

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
                    Welcome, {user?.displayName}
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
            </div>
          </main>
        </div>
      )}
    </>
  );
}
