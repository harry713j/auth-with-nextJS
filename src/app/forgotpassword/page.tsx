"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const onForgot = async () => {
    try {
      await axios.post("/api/users/forgotpassword", { email });
      toast.success("Forgot password successful", { position: "top-center" });
      setIsButtonClicked(true);
    } catch (error: any) {
      console.log(error.response.data);
      toast.error("Unable to forgot password", { position: "top-center" });
    }
  };

  React.useEffect(() => {
    if (email.length > 0) {
      setDisableButton(false);
    } else {
      setDisableButton(false);
    }
  }, [email]);

  return (
    <div className="flex min-h-screen items-center justify-center p-24 bg-gradient-to-t from-red-400 to-pink-400">
      {isButtonClicked ? (
        <>
          <h1 className="text-2xl font-medium text-slate-200 mb-4">
            Please check your email for reset the password
          </h1>
        </>
      ) : (
        <div
          className="flex flex-col gap-3 items-center w-[40%] bg-gradient-to-t from-red-400 to-pink-400 
          border-4 border-indigo-200 rounded-xl px-2 py-8 shadow-md"
        >
          <h1 className="text-4xl font-medium text-slate-200 mb-4">
            Forgot Password
          </h1>

          <span className="flex flex-col items-start w-[60%]">
            <label
              htmlFor="email"
              className="text-lg font-medium text-slate-200/50 capitalize"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Email..."
              className="w-full inline-block rounded px-3 py-1 shadow-inner text-gray-600 border-none outline-2 outline-transparent placeholder:capitalize focus:outline-none focus:border-2 focus:outline-cyan-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </span>

          <span className="flex flex-col items-center gap-4 w-[80%]">
            <button
              onClick={onForgot}
              disabled={disableButton}
              className="w-[50%] bg-red-300 capitalize disabled:bg-red-200 disabled:hover:ring-transparent rounded-lg p-1.5 mt-2 cursor-pointer text-slate-100 text-base font-semibold transition hover:bg-red-500 hover:ring-1 hover:ring-slate-100"
            >
              Send reset mail
            </button>
          </span>
        </div>
      )}
    </div>
  );
}
