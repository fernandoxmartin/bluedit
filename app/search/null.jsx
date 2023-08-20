"use client";
import React from "react";
import { FaRegFaceTired } from "react-icons/fa6";

export default function Null({ query }) {
  return (
    <div className="w-full h-72 bg-light flex items-center justify-center p-6 lg:rounded-md text-gray-400 dark:bg-dark dark:text-dark-text">
      <div className="flex flex-col items-center justify-center">
        <div className="text-[9rem] text-neutral-300 mb-8">
          <FaRegFaceTired />
        </div>
        <p className="text-center">
          Unfortunately, we couldn&apos;t find any results for `{query}`
        </p>
      </div>
    </div>
  );
}
