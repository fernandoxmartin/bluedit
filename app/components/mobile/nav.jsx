"use client";
import Link from "next/link";
import Logout from "../logout";
import { BiHome, BiGlobe } from "react-icons/bi";
import Search from "../header/search";
import { useGlobalContext } from "@/app/context/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Feeds from "../feeds";
import Theme from "../theme";
import UserAvatar from "../userAvatar";
import SearchInput from "../searchInput";

export default function Nav() {
  const { isOpen } = useGlobalContext();
  const { data: session } = useSession();

  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isOpen]);

  const feeds = [
    { page: "Home", loc: "/", icon: <BiHome /> },
    // { page: "All", loc: "/all", icon: <BiGlobe /> },
  ];

  return (
    <div
      className={
        isOpen
          ? "w-full h-full bg-primary absolute top-16 left-0 z-20 opacity-1 pointer-events-auto transition-all duration-500 dark:bg-dark lg:hidden"
          : "w-full h-full bg-light absolute top-16 left-0 z-10 opacity-0 pointer-events-none transition-all duration-500 dark:bg-dark lg:hidden"
      }
    >
      <div className="lg:flex flex-col w-full h-full text-light px-8 py-2 relative">
        <Search />
        {session ? (
          <div className="my-8 flex items-center">
            <UserAvatar size={35} space={2} user={session?.user?.name} />
            <h2 className="">{session.user.name}</h2>
          </div>
        ) : (
          <div></div>
        )}

        <div className="flex relative w-full my-2 pr-2 h-12 items-center rounded-md bg-white dark:bg-dark border dark:border-neutral-600">
          <SearchInput />
        </div>

        <div className="w-full mb-8">
          <h3 className="mt-8">Feeds</h3>
          <ul className="p-2">
            {feeds.map((feed) => {
              return (
                <li key={feed.page}>
                  <Link href={`${feed.loc}`} className="flex items-center my-4">
                    <div className="text-2xl mr-2">{feed.icon}</div>
                    <span className="text-xl font-bold">{feed.page}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="w-full mb-8">
          <h3 className="">My Communities</h3>
          <ul className="p-2 max-h-48 overflow-y-auto">{<Feeds />}</ul>
        </div>

        <div className="">
          <h3>Settings</h3>
          <div className="flex items-center justify-between">
            <Theme />
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
}
