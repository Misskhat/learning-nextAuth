"use client";
import { useSession } from "next-auth/react";
import React from "react";

const UserCard = () => {
  const session = useSession();
  return (
    <div>
      <h2 className="text-xl font-bold">User Information from client</h2>
      <div className="border-2 rounded p-4">{JSON.stringify(session)}</div>
    </div>
  );
};

export default UserCard;
