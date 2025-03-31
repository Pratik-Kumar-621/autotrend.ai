"use client";

import { useAuth } from "@/lib/auth-context";
import LoadingScreen from "../(landing)/_components/LoadingScreen";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import LandingExplore from "../(landing)/_components/Explore_Section/LandingExplore";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import Image from "next/image";

export default function Dashboard() {
  const { loadingAuth, user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [suggestion, setSuggestion] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(posts);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token", token);
    if (!token) {
      redirect("/");
    }
    const fetchData = async () => {
      try {
        const [suggestionResponse, postsResponse] = await Promise.all([
          fetch("/api/post/suggestedkeyword", { method: "POST" }),
          fetch("/api/post/save", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const suggestionData = await suggestionResponse.json();
        const postsData = await postsResponse.json();

        setSuggestion(suggestionData);
        setPosts(postsData);
      } catch (error: any) {
        toast.error(`Failed to fetch data. Reason: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {(loadingAuth || loading) && <LoadingScreen />}

      <div className="dashboard">
        <div className="dashboard-nav">
          <div className="landing-hero-nav-logo">
            <Image
              src="/images/Logo/Logo.png"
              alt="Logo"
              width={31}
              height={20}
            />
            Autotrend.ai
          </div>
          <div className="dashboard-nav-content">
            <div className="dashboard-nav-content-name">
              Hi {user?.displayName}
            </div>
          </div>
          <Button
            className="dashboard-nav-content-logout"
            variant="outlined"
            color="error"
            autoCapitalize="true"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
        <div className="dashboard-content">
          <LandingExplore {...{ suggestion }} />
        </div>
      </div>
    </>
  );
}
