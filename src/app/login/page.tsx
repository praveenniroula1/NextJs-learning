"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      alert("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">{loading ? "Processing" : "Login"}</h1>
        <hr className="mb-4" />
        <label htmlFor="email" className="block mb-2 text-gray-700">Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 text-black w-full"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <label htmlFor="password" className="block mb-2 text-gray-700">Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 text-black w-full"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button
          onClick={onLogin}
          className="w-full p-2 bg-blue-500 text-white rounded-lg mb-4 hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:bg-blue-700"
          disabled={buttonDisabled}
        >
          Login here
        </button>
        <Link href="/signup" className="text-blue-500 hover:underline text-center block">Visit Signup page</Link>
      </div>
    </div>
  );
}
