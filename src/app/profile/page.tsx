"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [username, setUsername] = useState("");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      alert("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
      setUsername(res.data.data.username); 
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
        <hr className="mb-4" />
        <p className="text-lg font-semibold mb-4 text-center">Hello, {username}</p>
        <h2 className="p-2 rounded bg-green-500 text-white text-center mb-4">
          {data === "nothing" ? (
            "User"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h2>
        <hr className="mb-4" />
        <button
          onClick={logout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-2 transition duration-300 ease-in-out"
        >
          Logout
        </button>
        {/* <button
          onClick={getUserDetails}
          className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out"
        >
          Get User Details
        </button> */}
      </div>
    </div>
  );
}
