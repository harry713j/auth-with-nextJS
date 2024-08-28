"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Response from sign up (success) : ", response);
      // redirect to login page
      router.push("/profile");
    } catch (error: any) {
      console.log("Error: ", error.message);
      toast.error("Sign up Failed", { position: "top-center" });
    }
  };

  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [user]);

  return (
    <div className="flex min-h-screen items-center justify-center p-24 bg-gradient-to-t from-red-400 to-pink-400">
      <div
        className="flex flex-col gap-3 items-center w-[40%] bg-gradient-to-t from-red-400 to-pink-400 
      border-4 border-indigo-200 rounded-xl px-2 py-8 shadow-md"
      >
        <h1 className="text-4xl font-medium text-slate-200 mb-4">Login</h1>

        <span className="flex flex-col items-start w-[60%]">
          <label
            htmlFor="email"
            className="text-lg font-medium text-slate-200/50 capitalize"
          >
            email
          </label>
          <input
            type="text"
            id="email"
            placeholder="email"
            className="w-full inline-block rounded px-3 py-1 shadow-inner text-gray-600 border-none outline-2 outline-transparent placeholder:capitalize focus:outline-none focus:border-2 focus:outline-cyan-500"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </span>
        <span className="flex flex-col items-start w-[60%]">
          <label
            htmlFor="password"
            className="text-lg font-medium text-slate-200/50 capitalize"
          >
            password
          </label>
          <input
            type="text"
            id="password"
            placeholder="password"
            className="w-full inline-block rounded px-3 py-1 shadow-inner text-gray-600 border-none outline-2 outline-transparent placeholder:capitalize focus:outline-none focus:border-2 focus:outline-cyan-500"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </span>
        <span className="flex flex-col items-center gap-2 w-[60%]">
          <button
            onClick={onLogin}
            disabled={disableButton}
            className="w-[60%] bg-red-300 rounded-lg p-1.5 mt-2 cursor-pointer text-slate-100 text-base font-semibold transition hover:bg-red-500 hover:ring-1 hover:ring-slate-100"
          >
            {loading ? "Processing" : "Login"}
          </button>
          <Link
            href="/signup"
            className="text-transparent bg-gradient-to-t from-cyan-300 to-slate-100 bg-clip-text font-medium transition-all hover:underline hover:bg-gradient-to-t hover:from-cyan-400 hover:to-slate-300 hover:bg-clip-text"
          >
            Visit Sign up page
          </Link>
        </span>
      </div>
    </div>
  );
}
