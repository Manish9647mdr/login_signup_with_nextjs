"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast/headless";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, SetButtonDisabled] = React.useState(false);
  
  const [loading, setLoading] = React.useState(false)

  const onSignup = async () => {
    try {
      setLoading(true);
     const response = await axios.post("/api/users/signup", user)
     console.log("Signup success" , response.data);
     router.push("/login");
    } catch (error:any) {
      console.log("Signup failed",error.message)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0 ){
      SetButtonDisabled(false);
    } else{
      SetButtonDisabled(true)
    }
  },[user]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username" className="text-2xl">
        username
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
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
         onClick={onSignup}
         className="p-2 border border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 bg-green-200">
        {buttonDisabled ? "No signup" : "Signup"}
      </button>
      <Link href='/login'>Visit Login page</Link>
    </div>
  );
}