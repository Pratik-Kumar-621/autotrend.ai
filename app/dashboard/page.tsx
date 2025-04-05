"use client";

import { useAuth } from "@/lib/auth-context";
import LoadingScreen from "../(landing)/_components/LoadingScreen";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import UserNav from "../_components/UserNav";
import "../_assets/styles/dashboard.scss";
import DashboardContent from "./_components/DashboardContent";
import axios from "axios";

export default function Dashboard() {
  const { loadingAuth, token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [suggestion, setSuggestion] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPosted, setIsPosted] = useState(new Date());
  console.log(posts);
  useEffect(() => {
    if (!loadingAuth) {
      if (!token) {
        redirect("/");
      }
      const fetchData = async () => {
        try {
          const [suggestionResponse, postsResponse] = await Promise.all([
            axios.post("/api/suggestionGen"),
            axios.get("/api/savePost", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);
          if (suggestionResponse.data.type === "Error") {
            throw new Error("Error generating suggestion");
          }
          if (postsResponse.data.type === "Error") {
            throw new Error("Error fetching saved posts");
          }
          const suggestionData = await suggestionResponse.data;
          const postsData = await postsResponse.data;
          setSuggestion(suggestionData.data);
          setPosts(postsData.data);
        } catch (error: any) {
          toast.error(`Failed to fetch data. Reason`);
          return error.message;
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [isPosted, loadingAuth]);

  return (
    <>
      {loadingAuth || loading || !token ? (
        <LoadingScreen />
      ) : (
        <div className="dashboard">
          <UserNav />
          <div
            style={{
              textAlign: "right",
              color: "white",
              fontSize: ".7rem",
              padding: "10px",
              marginBottom: "-20px",
            }}
          >
            {" "}
            <strong>Disclaimer: </strong> This page is currently on working
            phase
          </div>
          <div className="dashboard-content">
            <DashboardContent
              {...{ posts, setIsPosted, suggestion, setPosts }}
            />
          </div>
        </div>
      )}
    </>
  );
}
