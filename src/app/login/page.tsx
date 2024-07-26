"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";

const LoginPage = () => {
  const router=useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled,setButtonDisabled]=useState(false)
  const [loading,setLoading]=useState(false)
  const onLogIn = async () => {
    try {
      setLoading(true)
     const response=await axios.post("/api/users/login",user)
     console.log("Login success", response.data)
     router.push("/profile")
    } catch (error:any) {
      console.log(error.message)
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading? "Processing...": "Login"}</h1>
      <hr></hr>
     
      <label htmlFor="email">email</label>
      <input
        className="p-1 border border-gray-300 rounded-lg mb-4 focus;outline-none focus:border-gray-600"
        id="email"
        value={user.email}
        type="text"
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
      onClick={onLogIn}
      className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login Here</button>
      <Link href="/signup">Not a member? Please SignUp.</Link>
    </div>
  );
};

export default LoginPage;
