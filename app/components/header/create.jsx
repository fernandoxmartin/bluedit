"use client";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import { useGlobalContext } from "@/app/context/store";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function Create() {
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
    <div href={"/new"} onClick={handleClick}>
      <button className="hidden lg:flex h-12 px-4 border items-center mr-4 rounded-md text-neutral-600 dark:text-dark-text hover:bg-gray-200 dark:border-neutral-600 dark:hover:bg-neutral-600">
        <IoMdAdd className="text-2xl" />
      </button>
    </div>
  );
}
