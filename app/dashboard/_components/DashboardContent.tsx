"use client";
import LandingExplore from "@/app/(landing)/_components/Explore_Section/LandingExplore";
import { useAuth } from "@/lib/auth-context";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const DashboardContent = (props: any) => {
  const { suggestion, posts, setIsPosted } = props;

  const [open, setOpen] = useState(false);
  console.log(open);
  const { token } = useAuth();

  const handleAfterPost = async () => {
    try {
      const postsResponse = axios.get("/api/savePost", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await postsResponse.data;
      if (responseData.type === "Error") {
        throw new Error("Error fetching saved posts");
      } else {
        toast.success("Post saved successfully");
        setIsPosted(new Date());
      }
    } catch (error: any) {
      toast.error(`Error fetching saved posts`);
      return error.message;
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="dashboard-content">
      {posts?.length === 0 ? (
        <>No Content</>
      ) : (
        <div style={{ color: "white" }}>
          {posts?.map((item) => {
            return (
              <div className="dashboard-content-list-item" key={item.id}>
                <Image
                  className="dashboard-content-list-item-image"
                  src={item.image}
                  alt={item.keyword}
                  width={300}
                  height={300}
                />
                <div className="dashboard-content-list-item-keyword">
                  <strong>Keyword: </strong> {item.keyword}
                </div>
                <div className="dashboard-content-list-item-description">
                  <strong>Description: </strong> {item.description}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <LandingExplore {...{ suggestion, handleAfterPost, token }} />
    </div>
  );
};

export default DashboardContent;
