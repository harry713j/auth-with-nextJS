"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";

export default function VerifyEmailPage() {
  //   const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  // using nextJS power
  //   useEffect(() => {
  //     const { query } = router;
  //     const urlToken = query.token
  //     setToken(urlToken);
  //   }, [router]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24 bg-gradient-to-t from-red-400 to-pink-400">
      <h1 className="text-4xl text-slate-100/80">Verify Email</h1>
      <h2 className="py-2 px-4 border border-slate-100 bg-orange-400 rounded-md capitalize text-slate-100 mt-2">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div className="flex flex-col gap-3 mt-3 ">
          <h2 className="text-xl py-2 px-4 border border-slate-100 bg-green-300 rounded-md capitalize text-slate-100 ">
            Email Verified
          </h2>
          <Link href="/login">Login</Link>
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
