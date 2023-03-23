"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <button
        className="px-4 py-2 rounded-lg bg-primary text-light text-xs cursor-pointer"
        onClick={() => signIn()}
      >
        Log In
      </button>
    </div>
  );
}
