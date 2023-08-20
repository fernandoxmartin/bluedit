"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BiChevronDown, BiHome, BiRocket } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";
import UserAvatar from "../userAvatar";

export default function DropDownNav() {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("Home");
  const [selectedIcon, setSelectedIcon] = useState(<BiHome />);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const data = useQueryClient()?.getQueryCache()?.queries[0]?.state?.data;
  const feeds = [
    { page: "Home", loc: "/", icon: <BiHome /> },
    { page: "Following", loc: "/b/following", icon: <BiRocket /> },
  ];

  useEffect(() => {
    const path = pathname.split("/")[2];
    if (path === undefined) {
      setSelected("Home");
      setSelectedIcon(<BiHome />);
    } else {
      setSelected(`${path}`);
    }
  }, [pathname]);

  return (
    <div className="hidden lg:block font-medium w-60 h-12 my-auto z-5">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white border w-full p-2 px-4 flex items-center justify-between rounded-md cursor-pointer dark:bg-dark dark:border-neutral-600 ${
          !selected && "text-gray-600"
        }`}
      >
        <div className="flex items-center h-[30px] w-full text-sm">
          <div className="flex items-center justify-center text-lg mr-1">
            {selectedIcon}
          </div>

          {selected
            ? selected?.length > 25
              ? selected?.substring(0, 25) + "..."
              : selected
            : ""}
        </div>

        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto rounded-b-md drop-shadow-lg shadow-xl shadow-neutral-400 dark:shadow-neutral-900 dark:bg-dark ${
          open ? "max-h-84 " : "max-h-0"
        } `}
      >
        <div className="w-full flex items-center px-4 sticky top-0 border-b bg-gray-100 border-gray-200 dark:bg-neutral-700 dark:border-neutral-700 ">
          <AiOutlineSearch
            size={18}
            className="text-gray-700 dark:text-neutral-400"
          />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Search Community"
            className="placeholder:text-gray-700 p-2 py-3 outline-none w-full bg-gray-100 text-sm dark:bg-neutral-700 dark:placeholder:text-neutral-400"
          />
        </div>
        {/* User Communities */}
        {data?.length < 1 ? (
          <></>
        ) : (
          <div className="p-4 text-xs font-bold">My Communities</div>
        )}

        {data?.map((sub) => (
          <li
            key={sub?.slug}
            className={`flex items-center p-2 pl-6 text-sm hover:bg-sky-600 hover:text-white cursor-pointer
            ${
              sub?.slug?.toLowerCase() === selected?.toLowerCase() &&
              "bg-gray-400 text-white dark:bg-neutral-700"
            }
            ${
              sub?.slug?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (sub?.slug?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(sub?.slug);
                setSelectedIcon(
                  <UserAvatar size={20} space={0} user={sub?.slug} />
                );
                setOpen(false);
                setInputValue("");
                router.push(`/b/${sub?.slug}`);
              }
            }}
          >
            <span className="mr-2 text-lg">
              <UserAvatar size={20} space={0} user={sub?.slug} />
            </span>
            {sub?.slug}
          </li>
        ))}
        {/* Default Feeds */}
        <div className="p-4 text-xs font-bold">Feeds</div>
        {feeds?.map((feed) => (
          <li
            key={feed?.page}
            className={`p-2 pl-6 text-sm hover:bg-sky-600 hover:text-white cursor-pointer flex items-center dark:hover:bg-sky-600
            ${
              feed?.page?.toLowerCase() === selected?.toLowerCase() &&
              "bg-gray-400 text-white dark:bg-neutral-700"
            }
            ${
              feed?.page?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (feed?.page?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(feed?.page);
                setSelectedIcon(feed?.icon);
                setOpen(false);
                setInputValue("");
                router.push(`${feed?.loc}`);
              }
            }}
          >
            {" "}
            <span className="mr-2 text-lg">{feed?.icon}</span>
            {feed?.page}
          </li>
        ))}
      </ul>
    </div>
  );
}
