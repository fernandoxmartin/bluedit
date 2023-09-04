"use client";
import React, { useState, useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import UserAvatar from "./userAvatar";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/store";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { setIsOpen } = useGlobalContext();

  const getSubs = async () => {
    const response = await axios.get(`/api/subs`);
    return response.data;
  };

  const subsQuery = useQuery({
    queryKey: ["searchSubs"],
    queryFn: getSubs,
  });

  const filteredSubs = subsQuery?.data?.filter((sub) => {
    if (!query) {
      return null;
    }
    return sub.slug.includes(query.toLowerCase());
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchOpen(false);
    setIsOpen(false);
    router.push(`/search?q=${query}`);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [searchOpen]);

  return (
    <div className="w-full" ref={dropdownRef}>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className=" w-full mx-2 placeholder:text-gray-400 text-gray-600 outline-none dark:bg-dark dark:text-dark-text dark:placeholder:text-neutral-400"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setSearchOpen(true)}
        />
      </form>

      {searchOpen ? (
        <div className="absolute w-full min-h-0 left-0 top-12 z-10 rounded-md bg-neutral-100 dark:bg-dark px-4 shadow-lg shadow-neutral-800/40 dark:shadow-lg dark:shadow-black/50">
          {filteredSubs && filteredSubs.length > 0 ? (
            <ul className="w-full border-b border-neutral-300">
              <h3 className="text-sm text-neutral-600 dark:text-neutral-300 mt-4">
                Communities
              </h3>
              <div className="py-4">
                {filteredSubs &&
                  filteredSubs.map((sub) => (
                    <Link
                      href={`/b/${sub.slug}`}
                      key={sub.id}
                      onClick={() => setSearchOpen(false)}
                    >
                      <li className="flex items-center pl-4 py-2 rounded hover:bg-neutral-300 dark:hover:bg-neutral-700">
                        <UserAvatar size={25} space={2} user={sub.slug} />
                        <p className="text-sm text-light-text dark:text-white">
                          <span className="text-xs text-neutral-400">b/</span>
                          {sub.slug}
                        </p>
                        <p className="px-2">·</p>
                        <p className="text-xs text-neutral-400">
                          {sub._count.members + 1}
                          {sub._count.members + 1 === 1
                            ? " member"
                            : " members"}
                        </p>
                      </li>
                    </Link>
                  ))}
              </div>
            </ul>
          ) : (
            <></>
          )}
          <div className="w-full flex items-center justify-center">
            <BiSearch className="text-lg text-neutral-400 mr-2" />
            <p className="w-full text-sm text-neutral-400 py-4 break-words">
              Search for {"'"}
              {query}
              {"'"}
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
