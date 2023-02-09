import React from "react";
import { BiSearch } from "react-icons/bi";

export const SearchBar = () => {
  return (
    <div className="flex items-center bg-light rounded-lg mb-4">
      <BiSearch className="text-lg text-light-text ml-4 " />
      <input
        type="text"
        className=" w-full mx-2 h-10 text-light-text outline-none"
        placeholder="Search"
      />
    </div>
  );
};
