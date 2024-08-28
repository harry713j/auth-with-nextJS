"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Unable to logout");
    }
  };

  const getUserId = async () => {
    try {
      const res = await axios.post("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-3 min-h-screen items-center justify-center p-24 bg-gradient-to-t from-red-400 to-pink-400">
      <h1 className="text-3xl font-semibold text-slate-100/80">Profile Page</h1>
      <hr />
      <h2 className="py-2 px-4 border border-slate-100 bg-orange-400 rounded-md capitalize text-slate-100">
        {data ? (
          <Link className="hover:underline" href={`/profile/${data}`}>
            {data}
          </Link>
        ) : (
          "anything"
        )}
      </h2>
      <hr />
      <div className="flex flex-col items-center justify-center gap-4 ">
        <button
          onClick={getUserId}
          className=" bg-green-500 rounded-lg py-1.5 px-4 mt-2 cursor-pointer text-slate-100 text-base font-semibold transition hover:bg-green-600 hover:ring-1 hover:ring-slate-100"
        >
          Get user details
        </button>
        <button
          onClick={logout}
          className=" bg-red-500 rounded-lg py-1.5 px-4 mt-2 cursor-pointer text-slate-100 text-base font-semibold transition hover:bg-red-400 hover:ring-1 hover:ring-slate-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
