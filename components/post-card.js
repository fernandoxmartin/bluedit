import { BiUpvote, BiDownvote, BiMessageDetail } from "react-icons/bi";
import Link from "next/link";
import TimeAgo from "react-timeago";

export const PostCard = ({ posts }) => {
  return (
    <>
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className="h-72 bg-light p-4 lg:rounded-xl flex flex-col mb-6 dark:bg-dark dark:text-dark-text"
          >
            <div className="row-span-2 mb-4">
              <div className="flex items-center mb-4 text-xs text-gray-400">
                <Link href={`/b/${post.subname}`} className="flex items-center">
                  <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                  <p className="text-light-text">b/{post.subname}</p>
                </Link>

                <div className="flex items-center">
                  <p className="ml-2 font-black">·</p>
                  <p className="hidden lg:block ml-2">
                    Posted by <span className="">u/{post.username}</span>
                  </p>
                </div>

                <div className="ml-2">
                  <TimeAgo date={post.createdAt} />
                </div>
              </div>
              <h2 className="text-xl font-bold line-clamp-2 dark:text-light">
                {post.title}
              </h2>
            </div>

            <div className="h-full row-span-3 relative -z-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-light via-light dark:via-dark dark:from-dark"></div>
              <div className="line-clamp-3 text-gray-600 dark:text-dark-text">
                {post.body}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <BiUpvote className="text-xl" />
                <p className="px-1">{!post.votes ? "0" : post.votes}</p>
                <BiDownvote className="text-xl" />
              </div>

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
};
