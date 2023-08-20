"use client";
import React from "react";
import Link from "next/link";
import UserAvatar from "./userAvatar";
import { TbCrown } from "react-icons/tb";

export default function Top({ topUsers, topSubs }) {
  return (
    <div className='hidden w-full lg:flex flex-col items-center rounded-md bg-light dark:bg-dark mt-2 lg:mb-6 p-6"'>
      <div className="w-full p-6">
        <div className="w-full flex items-center space-x-2 mb-4">
          <TbCrown className="text-2xl" />
          <h2 className="w-full">Top Users</h2>
        </div>

        <div className="w-full border-b-[0.5px] border-gray-300 dark:border-neutral-700 mb-2"></div>
        {topUsers.map((user) => (
          <div
            key={user.user.id}
            className="w-full flex items-center justify-between my-4"
          >
            <div className="flex items-center">
              <UserAvatar size={25} space={2} user={user.user.name} />
              <p className="text-sm">
                u/{user.user.name.split(" ").join("").toLowerCase()}
              </p>
            </div>

            <p className="font-bold">{user.total}</p>
          </div>
        ))}
      </div>

      <div className="w-full p-6">
        <div className="w-full flex items-center space-x-2 mb-4">
          <TbCrown className="text-2xl" />
          <h2 className="w-full">Top Communities</h2>
        </div>

        <div className="w-full border-b-[0.5px] border-gray-300 dark:border-neutral-700 mb-2"></div>
        {topSubs.map((sub) => (
          <div
            key={sub.id}
            className="w-full flex items-center justify-between my-4"
          >
            <div className="flex items-center">
              <UserAvatar size={25} space={2} user={sub.slug} />
              <Link href={`/b/${sub.slug}`} className="text-sm">
                b/{sub.slug}
              </Link>
            </div>
            <p className="font-bold">{sub.members}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
