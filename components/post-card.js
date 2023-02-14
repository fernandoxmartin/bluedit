import { BiUpvote, BiDownvote, BiMessageDetail } from "react-icons/bi";

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
                <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                <p>b/{post.sub}</p>
                <div className="ml-2">
                  <p>
                    Posted by{" "}
                    <span className="text-light-text dark:text-light">
                      u/{post.user}
                    </span>
                  </p>
                </div>
              </div>
              <h2 className="text-xl font-bold line-clamp-2 dark:text-light">
                {post.title}
              </h2>
            </div>

            <div className="h-full row-span-3 relative -z-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-light via-light dark:via-dark dark:from-dark"></div>
              <div className="line-clamp-3 text-gray-600 dark:text-dark-text">
                {post.content}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <BiUpvote className="text-xl" />
                <p className="px-1">{post.votes}</p>
                <BiDownvote className="text-xl" />
              </div>

              <div className="flex items-center">
                <BiMessageDetail className="text-xl" />
                <p className="pl-1">{post.comments}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
