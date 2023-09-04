import React from "react";
import JoinButton from "./joinButton";
import ToastButton from "./toastButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function AboutSub({ sub, user }) {
  const session = await getServerSession(authOptions);

  const created = new Date(sub.createdAt);
  const createdAt = created.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="w-full h-full max-h-96 lg:rounded-md mb-2 flex flex-col items-center col-span-2 bg-light dark:bg-dark row-start-1 lg:row-start-auto lg:col-span-1">
      <div className="bg-primary w-full h-20 lg:h-14 flex items-center justify-center lg:rounded-t-md">
        <h1
          className="text-light text-3xl lg:text-xl drop-shadow-xl"
          style={{ textShadow: "2px 2px 6px #000000" }}
        >
          {sub.name}
        </h1>
      </div>
      <div className="w-full p-4 px-6 flex flex-col">
        <div className="mb-4">
          <h3 className="text-md">About Community</h3>
          <div className="py-4">
            <p className="text-gray-400 dark:text-dark-text text-sm line-clamp-3">
              {sub.description}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between text-sm">
          <div className="flex flex-col mr-12">
            <p>Created</p>
            <p className="font-bold mt-2">{createdAt}</p>
          </div>
          <div className="flex flex-col items-end">
            <p>Members</p>
            <p className="font-bold mt-2">{sub.members.length + 1}</p>
          </div>
        </div>
        {session?.user && <JoinButton sub={sub} user={user} />}
        {!session?.user && <ToastButton />}
      </div>
    </div>
  );
}
