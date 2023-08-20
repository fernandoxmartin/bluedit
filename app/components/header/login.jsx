"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <button
        className="px-4 py-2 rounded bg-primary lg:w-32 lg:h-12 text-light text-xs lg:text-sm cursor-pointer"
        onClick={() => signIn()}
      >
        Log In
      </button>
    </div>
  );
}
