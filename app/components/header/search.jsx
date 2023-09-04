"use client";
import React from "react";
import { BiSearch } from "react-icons/bi";
import SearchInput from "../searchInput";

export default function Search() {
  return (
    <div className="hidden lg:flex relative w-full my-2 pr-2 h-12 items-center rounded-md dark:bg-dark border dark:border-neutral-600">
      <BiSearch className="text-lg text-gray-400 ml-4 dark:text-dark-text" />
      <SearchInput />
    </div>
  );
}
