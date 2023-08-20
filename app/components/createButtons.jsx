"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/store";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function CreateButtons() {
  const { setOpen } = useGlobalContext();
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (!session?.user) {
      return toast.error("You must be logged in to create a post/community!");
    }
    router.push("/new");
    setOpen(true);
  };

  return (
    <div className="hidden w-full lg:flex flex-col mt-6 space-y-2">
      <div
        className="w-full h-10 flex items-center justify-center rounded-md bg-primary text-light text-sm cursor-pointer"
        onClick={handleClick}
      >
        Start a New Post
      </div>
      <div
        className="w-full h-10 flex items-center justify-center rounded-md bg-light border-2 border-primary text-primary text-sm cursor-pointer dark:bg-dark dark:text-dark-text"
        onClick={handleClick}
      >
        Create Community
      </div>
    </div>
  );
}
