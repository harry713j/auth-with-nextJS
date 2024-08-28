import React from "react";

export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col gap-3 min-h-screen items-center justify-center p-24 bg-gradient-to-t from-red-400 to-pink-400">
      <h1 className="text-3xl font-semibold text-slate-100/80">Profile</h1>
      <hr />
      <p className="py-2 px-4 border text-lg border-slate-100 bg-orange-400 rounded-md capitalize text-slate-100">
        {params.id}
      </p>
    </div>
  );
}
