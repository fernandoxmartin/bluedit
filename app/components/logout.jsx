"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Logout() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button
          className="px-6 py-2 rounded-lg bg-primary text-sm text-light border-2 border-light dark:bg-dark dark:border-primary"
          onClick={() => signOut()}
        >
          Log Out
        </button>
      </>
    );
  }
  return <div></div>;
}
