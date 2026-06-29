"use client";
import React from "react";
import LoginButton from "./LoginButton";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

function AuthButton() {
  const session = useSession();
  console.log(session.status);
  return (
    <div>
      <div className="flex gap-5">
        {session.status === "authenticated" ? (
          <button className="btn" onClick={() => signOut()}>
            Logout
          </button>
        ) : (
          <>
            <LoginButton></LoginButton>
            <Link href={"/register"} className="btn">
              Register
            </Link>
          </>
        )}
      </div>
      <div></div>
    </div>
  );
}

export default AuthButton;
