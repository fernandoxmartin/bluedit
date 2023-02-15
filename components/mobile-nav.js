import React, { useContext } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import { Logoutbtn } from "./logout-btn";
import {
  BiHome,
  BiRocket,
  BiBarChartAlt2,
  BiCertification,
  BiCircle,
  BiSun,
  BiMoon,
} from "react-icons/bi";
import { SearchBar } from "./search-bar";
import { GlobalContext } from "@/context/global-context";

export const MobileNav = () => {
  const { data: session } = useSession();

  const { isOpen, theme, handleTheme } = useContext(GlobalContext);

  // dummy data used for now, import database data here
  const feeds = [
    { page: "Home", loc: "/", icon: <BiHome /> },
    { page: "Popular", loc: "/popular", icon: <BiRocket /> },
    { page: "Top", loc: "/top", icon: <BiBarChartAlt2 /> },
    { page: "New", loc: "/new", icon: <BiCertification /> },
  ];

  const communities = [
    { page: "sub1", loc: "/", icon: <BiCircle /> },
    { page: "sub2", loc: "/", icon: <BiCircle /> },
    { page: "sub3", loc: "/", icon: <BiCircle /> },
  ];

  return (
    <div
      className={
        isOpen
          ? "w-full h-[120vh] bg-primary absolute top-16 left-0 z-20 opacity-1 pointer-events-auto transition-all duration-500 dark:bg-dark lg:hidden"
          : "w-full h-full bg-light absolute top-16 left-0 z-10 opacity-0 pointer-events-none transition-all duration-500 dark:bg-dark lg:hidden"
      }
    >
      <div className="lg:flex flex-col w-full h-full text-light p-8 relative">
        <SearchBar />
        {session ? (
          <div className="my-6 flex items-center">
            <Image
              height={40}
              width={40}
              src={session.user.image}
              alt="user image"
              className="rounded-full mr-4"
              priority
            />
            <h2 className="">{session.user.name}</h2>
          </div>
        ) : (
          <div></div>
        )}
        <h3 className="mt-8">Feeds</h3>
        <ul className="my-2 mb-8">
          {feeds.map((feed) => {
            return (
              <Link href={feed.loc} key={feed.page}>
                <li className="flex items-center my-6">
                  <div className="text-2xl mr-4">{feed.icon}</div>
                  <div className="text-xl font-bold">{feed.page}</div>
                </li>
              </Link>
            );
          })}
        </ul>
        <h3 className="">My Communities</h3>
        <ul className="my-2 mb-8">
          {communities.map((com) => {
            return (
              <Link href={com.loc} key={com.page}>
                <li className="flex items-center my-6">
                  <div className="text-2xl mr-4">{com.icon}</div>
                  <div className="text-xl font-bold">/{com.page}</div>
                </li>
              </Link>
            );
          })}
        </ul>
        <h3>Settings</h3>
        <div className="flex items-center my-6 gap-2">
          <div className="text-2xl">
            <BiSun />
          </div>
          <label className="relative inline-flex items-center cursor-pointer ">
            <input
              type="checkbox"
              className="sr-only peer "
              onChange={handleTheme}
              checked={theme == "dark" ? true : false}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 "></div>
          </label>
          <div className="text-2xl">
            <BiMoon />
          </div>
        </div>
        <Logoutbtn />
      </div>
    </div>
  );
};
