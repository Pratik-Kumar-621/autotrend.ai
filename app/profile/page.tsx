"use client";
import React, { useEffect } from "react";
import UserNav from "../_components/UserNav";
import { useAuth } from "@/lib/auth-context";
import { redirect } from "next/navigation";
import ProfileContent from "./_components/ProfileContent";
import "../_assets/styles/profile.scss";
import LoadingScreen from "../(landing)/_components/LoadingScreen";

const ProfilePage = () => {
  const { user, loadingAuth, token } = useAuth();
  const [userDetails, setUserDetails] = React.useState<any>(null);
  console.log(user);

  useEffect(() => {
    if (!loadingAuth) {
      if (!token) {
        redirect("/");
      }
      setUserDetails(() => {
        return {
          name: user?.displayName,
          connectedAccount: user?.providerData[0]?.providerId,
          joinedAt: user?.metadata?.creationTime?.split(", ")[1],
        };
      });
    }
  }, [loadingAuth]);

  return (
    <div>
      {loadingAuth && <LoadingScreen />}
      <UserNav />
      {!loadingAuth && <ProfileContent {...{ userDetails }} />}
    </div>
  );
};

export default ProfilePage;
