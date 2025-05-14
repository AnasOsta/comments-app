"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Navbar() {
  const router = useRouter();
  const { data } = useSession();
  console.log(data);
  return (
    <div className="w-full bg-white h-16 shadow px-4">
      <div className="max-w-5xl mx-auto h-full flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Comments<span className="text-[#5357B6]">Site</span>
          </h1>
        </div>
        {data?.user ? (
          <div className="font-semibold text-sm flex gap-x-2 items-center">
            <button
              onClick={() => signOut()}
              className="text-white px-4 py-2 rounded-lg cursor-pointer bg-red-600 hover:bg-red-700 active:opacity-90 select-none"
            >
              Logout
            </button>
            |
            <p className="text-xl font-bold capitalize">{data.user.username}</p>
          </div>
        ) : (
          <div className="font-semibold text-sm flex gap-x-2 items-center">
            <button
              onClick={() => router.push("/sign-in")}
              className="px-4 py-2 rounded-lg cursor-pointer hover:bg-[#5357B6]/30 active:opacity-90 select-none"
            >
              Sign in
            </button>
            |
            <button
              onClick={() => router.push("/sign-up")}
              className="px-4 py-2 rounded-lg cursor-pointer hover:bg-[#5357B6]/30 active:opacity-90 select-none"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
