"use client";

import { useAuth } from "@/lib/auth-context";
import LoadingScreen from "../(landing)/_components/LoadingScreen";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import UserNav from "../_components/UserNav";
import "../_assets/styles/dashboard.scss";
import DashboardContent from "./_components/DashboardContent";
import axios from "axios";

export default function Dashboard() {
  const { loadingAuth, token, twitterAccessToken, twitterAccessSecret } =
    useAuth();
  const [posts, setPosts] = useState([]);
  const [suggestion, setSuggestion] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPosted, setIsPosted] = useState(new Date());
  const [twitterCredentials, setTwitterCredentials] = useState({
    accessToken: "",
    accessSecret: "",
  });

  useEffect(() => {
    if (!loadingAuth) {
      if (!token) {
        redirect("/");
      }
      setTwitterCredentials({
        accessToken: twitterAccessToken,
        accessSecret: twitterAccessSecret,
      });

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

  const handlePost = async (post: any) => {
    setLoading(true);
    try {
      console.log(twitterCredentials);

      const response = await axios.post("/api/twitterPost", {
        accessToken: twitterCredentials.accessToken,
        accessSecret: twitterCredentials.accessSecret,
        tweet: post.description,
        altText: post.keyword,
        imageUrl: post.image,
      });
      const data = await response.data;
      if (data.type === "Error") {
        throw new Error(data.message);
      } else {
        toast.success("Content Posted Successfully");
      }
      return "Success ok";
    } catch (error: any) {
      toast.error(
        "OOPS!!! Sorry, but we are using free tier and limit reached for today 😅"
      );
      return "Error " + error.message;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loadingAuth || !token ? (
        <LoadingScreen />
      ) : (
        <div className="dashboard">
          <UserNav />
          <DashboardContent
            {...{
              posts,
              setIsPosted,
              suggestion,
              setPosts,
              setLoading,
              handlePost,
            }}
          />
        </div>
      )}
      {loading && <LoadingScreen />}
      <ToastContainer />
    </>
  );
}
