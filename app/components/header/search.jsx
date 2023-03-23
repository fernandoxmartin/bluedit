import React from "react";
import { BiSearch } from "react-icons/bi";

export default function Search() {
  return (
    <div className="flex items-center bg-light rounded-lg mb-4 dark:bg-dark-bg">
      <BiSearch className="text-lg text-light-text ml-4 dark:text-dark-text" />
      <input
        type="text"
        className=" w-full mx-2 h-10 text-light-text outline-none bg-light dark:bg-dark-bg dark:text-dark-text "
        placeholder="Search"
      />
    </div>
  );
}
