"use client";
import React, { useState, useEffect } from "react";
import { BiChevronDown, BiHome, BiRocket } from "react-icons/bi";
import Logout from "../logout";
import Theme from "../theme";
import UserAvatar from "../userAvatar";

export default function User({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="hidden lg:block font-medium my-auto w-60 h-12 z-5">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white border w-full p-2 px-4 flex items-center justify-between rounded-md cursor-pointer dark:bg-dark dark:border-neutral-600`}
      >
        <div className="flex items-center w-full">
          <UserAvatar size={30} space={0} user={user} />
          <span className="ml-2 text-sm">{user}</span>
        </div>
        <BiChevronDown size={20} className={`${open && "rotate-180"} ml-4`} />
      </div>
      <div
        className={`bg-white dark:bg-dark mt-2 overflow-y-auto drop-shadow-lg rounded-b-md shadow-xl shadow-neutral-400 dark:shadow-neutral-900 ${
          open ? "max-h-80" : "max-h-0"
        } `}
      >
        <div className="p-4">
          <div className=" py-2 text-xs font-bold">Settings</div>
          <div className="">
            <Theme />
          </div>
          <div className="border-b border-gray-400 my-4" />
          <div className="">
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
}
