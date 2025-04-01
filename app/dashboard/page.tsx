"use client";

import { useAuth } from "@/lib/auth-context";
import LoadingScreen from "../(landing)/_components/LoadingScreen";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import LandingExplore from "../(landing)/_components/Explore_Section/LandingExplore";
import { toast } from "react-toastify";
import UserNav from "../_components/UserNav";
import "../_assets/styles/dashboard.scss";

export default function Dashboard() {
  const { loadingAuth } = useAuth();
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
        <UserNav />
        <div className="dashboard-content">
          <LandingExplore {...{ suggestion }} />
        </div>
      </div>
    </>
  );
}
