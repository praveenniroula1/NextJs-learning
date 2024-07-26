"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignupPage = () => {
  const router=useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled,setButtonDisabled]=useState(false)
  const [loading,setLoading]=useState(false)
  
  const onSignUp = async () => {
    try {
      setLoading(true)
     const response=await axios.post("/api/users/signup",user)
     console.log("signup success", response.data)
     router.push("/login")
    } catch (error:any) {
      console.log(error.message)
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading? "Processing...": "Signup"}</h1>
      <hr></hr>
      <label htmlFor="username">username</label>
      <input
        className="p-1 border border-gray-300 rounded-lg mb-4 focus;outline-none focus:border-gray-600"
        id="username"
        value={user.username}
        type="text"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-1 border border-gray-300 rounded-lg mb-4 focus;outline-none focus:border-gray-600"
        id="email"
        value={user.email}
        type="email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        value={user.password}
        type="text"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
      onClick={onSignUp}
      className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled? "No Signup":"SignUp"} Here</button>
      <Link href="/login">Already signed up? Please Login.</Link>
    </div>
  );
};

export default SignupPage;
