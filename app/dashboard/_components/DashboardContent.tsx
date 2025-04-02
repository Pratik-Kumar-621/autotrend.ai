"use client";
import LandingExplore from "@/app/(landing)/_components/Explore_Section/LandingExplore";
import { useAuth } from "@/lib/auth-context";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const DashboardContent = (props) => {
  const { suggestion, posts, setIsPosted } = props;

  const [open, setOpen] = useState(false);
  console.log(open);
  const { token } = useAuth();

  const handleAfterPost = async () => {
    try {
      const response = await fetch("/api/post/save", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      if (data) {
        setIsPosted(new Date());
      }
    } catch (error) {
      toast.error(`Error fetching saved posts: ${error.message}`);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="dashboard-content">
      <LandingExplore {...{ suggestion, handleAfterPost, token }} />

      {posts.length === 0 ? (
        <>No Content</>
      ) : (
        <div style={{ color: "white" }}>
          {posts.map((item) => {
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
    </div>
  );
};

export default DashboardContent;
