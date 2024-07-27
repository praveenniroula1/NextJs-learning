"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {loading ? "Processing" : "Signup"}
        </h1>
        <hr className="mb-6" />
        <label htmlFor="username" className="block text-lg font-medium mb-2">
          Username
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:border-blue-500 text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />
        <label htmlFor="email" className="block text-lg font-medium mb-2">
          Email
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:border-blue-500 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <label htmlFor="password" className="block text-lg font-medium mb-2">
          Password
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full focus:outline-none focus:border-blue-500 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button
          onClick={onSignup}
          className={`p-2 w-full rounded-lg mb-4 font-bold text-white ${
            buttonDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out"
          }`}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "No Signup" : "Signup"}
        </button>
        <div className="text-center mt-4">
          <Link href="/login" className="text-blue-500 hover:underline">
            Visit login page
          </Link>
        </div>
      </div>
    </div>
  );
}
