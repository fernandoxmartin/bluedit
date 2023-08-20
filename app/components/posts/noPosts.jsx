"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { FaRegFaceTired } from "react-icons/fa6";

export default function NoPosts() {
  const pathname = usePathname().slice(1);

  return (
    <div className="h-72 bg-light flex flex-col items-center justify-center space-y-4 text-gray-400 lg:rounded-md  dark:bg-dark dark:text-dark-text">
      <div className="text-[9rem] text-neutral-300 mb-8">
        <FaRegFaceTired />
      </div>
      <p className="text-center">Oops, there seems to be no posts.</p>
    </div>
  );
}
