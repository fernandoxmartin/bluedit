"use client";
import PostVotes from "./postVotes";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import ToastVotes from "./toastVotes";
import PostAuthor from "./postAuthor";
import PostComments from "./postComments";
import Link from "next/link";

export default function PostCard({ post, user }) {
  // const session = await getServerSession(authOptions);
  const { data: session, status } = useSession();

  return (
    <>
      <div
        key={post.id}
        className="h-72 bg-light p-4 lg:p-6 lg:rounded-md  dark:bg-dark dark:text-dark-text md:grid md:grid-cols-[70px_auto]"
      >
        <div className="hidden md:flex justify-center md:py-4 pr-6 border-r dark:border-r-neutral-700">
          {session?.user && <PostVotes post={post} user={user} />}
          {!session?.user && <ToastVotes post={post} />}
        </div>

        <div className="h-full flex flex-col md:p-4 md:pl-8 md:pr-16">
          {/* Header */}
          <PostAuthor post={post} />

          {/* Title - Body */}
          <Link
            href={`/b/${post.sub.slug}/${post.id}`}
            className="h-full w-full md:w-[600px] lg:w-[450px] mb-4"
          >
            <div className=" mb-4">
              <h2 className="leading-7 whitespace-normal break-words text-2xl font-bold line-clamp-2 dark:text-light">
                {post.title}
              </h2>
            </div>

            <div className="overflow-hidden">
              <p className="whitespace-normal line-clamp-3 break-words text-gray-600 dark:text-dark-text text-sm">
                {post.body}
              </p>
            </div>
          </Link>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm md:justify-end">
            {session?.user && (
              <PostVotes post={post} user={user} hidden={true} />
            )}
            {!session?.user && <ToastVotes post={post} hidden={true} />}
            <PostComments post={post} />
          </div>
        </div>
      </div>
    </>
  );
}
