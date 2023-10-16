"use client";
import Link from "next/link";
import React , {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  })

  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      toast.success("Login success");
      router.push("profile")
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">{loading ? "Processing":"Login"}</h1>
      <hr />
      <label htmlFor="username" className="text-2xl">
        email
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="username" className="text-2xl">
        password
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
         onClick={onLogin}
         className="p-2 border border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 bg-green-200">
        {buttonDisabled ? "No login" : "Login"}
      </button>
      <Link href='/signup'>Visit Signup page</Link>
    </div>
    
  );
}
