"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState<string>("");
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  React.useEffect(() => {
    if (!token) {
      console.log("No token provided");
    }
  }, [token]);

  const onReset = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", {
        newPassword,
        token,
      });
      console.log("Reset Password Success: ", response);
      toast.success("Password reset successful", { position: "top-center" });
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: any) {
      setLoading(false);
      console.log("Error: ", error.message);
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    if (newPassword.length > 0) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [newPassword]);
  return (
    <div className="flex min-h-screen items-center justify-center p-24 bg-gradient-to-t from-red-400 to-pink-400">
      <div
        className="flex flex-col gap-3 items-center w-[40%] bg-gradient-to-t from-red-400 to-pink-400 
  border-4 border-indigo-200 rounded-xl px-2 py-8 shadow-md"
      >
        <h1 className="text-4xl font-medium text-slate-200 mb-4">
          Reset password
        </h1>

        <span className="flex flex-col items-start w-[60%]">
          <label
            htmlFor="new-password"
            className="text-lg font-medium text-slate-200/50 capitalize"
          >
            New Password
          </label>
          <input
            type="text"
            id="new-password"
            placeholder="password..."
            className="w-full inline-block rounded px-3 py-1 shadow-inner text-gray-600 border-none outline-2 outline-transparent placeholder:capitalize focus:outline-none focus:border-2 focus:outline-cyan-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </span>

        <span className="flex flex-col items-center gap-4 w-[80%]">
          <button
            onClick={onReset}
            disabled={disableButton}
            className="w-[50%] bg-red-300 disabled:bg-red-200 disabled:hover:ring-transparent rounded-lg p-1.5 mt-2 cursor-pointer text-slate-100 text-base font-semibold transition hover:bg-red-500 hover:ring-1 hover:ring-slate-100"
          >
            {loading ? "Processing" : "Reset"}
          </button>
        </span>
      </div>
    </div>
  );
}
