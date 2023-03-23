import { BiMessageDetail } from "react-icons/bi";
import PostVotes from "./postVotes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ToastVotes from "./toastVotes";
import PostAuthor from "./postAuthor";

export default async function PostCard({ posts, user }) {
  const session = await getServerSession(authOptions);

  return (
    <>
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className="h-72 bg-light p-4 lg:rounded-xl flex flex-col mb-2 dark:bg-dark dark:text-dark-text"
          >
            {/* Header */}
            <div className="row-span-2 mb-4">
              <PostAuthor post={post} />
              <h2 className="text-xl font-bold line-clamp-2 dark:text-light">
                {post.title}
              </h2>
            </div>

            {/* Body */}
            <div className="h-full w-full row-span-3 overflow-hidden ">
              <p className="line-clamp-3 text-gray-600 dark:text-dark-text text-sm">
                {post.body}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm">
              {session?.user && <PostVotes post={post} user={user} />}
              {!session?.user && <ToastVotes post={post} />}

              <div className="flex items-center">
                <p className="pr-1">
                  {!post.comments ? "0" : post.comments.length}
                </p>
                <BiMessageDetail className="text-xl" />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
