"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignIn() {
  const router = useRouter();
  async function handleSignIn(formData: FormData) {
    const login = formData.get("login");
    const password = formData.get("password");
    const res = await signIn("credentials", {
      login,
      password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/");
    } else {
      console.log(res);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign In Page
        </h2>

        <form action={handleSignIn} className="space-y-4">
          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="login"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Email / Username
            </label>
            <input
              id="login"
              name="login"
              type="text"
              placeholder="example@email.com or username"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition select-none cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
