"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";

export default function VerifyTokenPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const verifyToken = async () => {
    try {
      await axios.post("/api/users/verifytoken", { token });

      setVerified(true);
      setError(false);
      setTimeout(() => {
        router.push(`/resetpassword?token=${token}`);
      }, 2000);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyToken();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24 bg-gradient-to-t from-red-400 to-pink-400">
      <h1 className="text-4xl text-slate-100/80">Verify Token</h1>
      <h2 className="py-2 px-4 border border-slate-100 bg-orange-400 rounded-md capitalize text-slate-100 mt-2">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div className="flex flex-col gap-3 mt-3 ">
          <h2 className="text-xl py-2 px-4 border border-slate-100 bg-green-300 rounded-md capitalize text-slate-100 ">
            Token Verified
          </h2>
        </div>
      )}
      {error && (
        <div className="flex flex-col gap-3 mt-3 ">
          <h2 className="text-xl py-2 px-4 border border-slate-100 bg-red-500 rounded-md capitalize text-slate-100 ">
            Error
          </h2>
        </div>
      )}
    </div>
  );
}
