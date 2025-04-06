"use client";
import React from "react";

const ProfileContent = (props: any) => {
  const { userDetails } = props;
  console.log("userDetails", userDetails);

  return (
    <div className="profile-card">
      <div className="profile-card-name">Welcome {userDetails?.name} !</div>
      <p className="profile-card-account">
        Connected Account:{" "}
        {userDetails?.connectedAccount === "twitter.com" ? (
          <svg
            fill="none"
            height="21"
            width="21"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={{ verticalAlign: "middle" }}
          >
            <path d="M0 0h512v512H0z" fill="#000" />
            <path
              clip-rule="evenodd"
              d="M192.034 98H83l129.275 170.757L91.27 412h55.908l91.521-108.34 81.267 107.343H429L295.968 235.284l.236.303L410.746 99.994h-55.908l-85.062 100.694zm-48.849 29.905h33.944l191.686 253.193h-33.944z"
              fill="#fff"
              fill-rule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            style={{ verticalAlign: "middle" }}
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        )}
      </p>
      <p className="profile-card-date">
        Joining Date: {userDetails?.joinedAt.split(" ").slice(0, 3).join(" ")}
      </p>
    </div>
  );
};

export default ProfileContent;
