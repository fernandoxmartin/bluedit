import PostVotes from "./postVotes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ToastVotes from "./toastVotes";
import PostAuthor from "./postAuthor";
import PostComments from "./postComments";
import Link from "next/link";

export default async function PostCard({ post, user }) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div
        key={post.id}
        className="h-72 bg-light p-4 lg:rounded-xl flex flex-col mb-2 dark:bg-dark dark:text-dark-text"
      >
        {/* Header */}
        <PostAuthor post={post} />

        {/* Title - Body */}
        <Link
          href={`/b/${post.sub.slug}/${post.id}`}
          className="h-full w-full row-span-2 mb-4"
        >
          <div className="mb-4">
            <h2 className="text-xl font-bold line-clamp-2 dark:text-light">
              {post.title}
            </h2>
          </div>
          <div className="w-full row-span-3 overflow-hidden ">
            <p className="line-clamp-3 text-gray-600 dark:text-dark-text text-sm">
              {post.body}
            </p>
          </div>
        </Link>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm">
          {session?.user && <PostVotes post={post} user={user} />}
          {!session?.user && <ToastVotes post={post} />}

          <PostComments post={post} />
        </div>
      </div>
    </>
  );
}
