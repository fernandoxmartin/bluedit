import { BiUpvote, BiDownvote, BiMessageDetail } from "react-icons/bi";

export const PostCard = ({ posts }) => {
  return (
    <>
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className="h-60 bg-light dark:bg-dark lg:rounded-xl flex mb-6 dark:text-dark-text"
          >
            <div className="w-1/6 flex flex-col items-center pt-4">
              <BiUpvote className="text-xl" />
              <p className="p-4">{post.votes}</p>
              <BiDownvote className="text-xl" />
            </div>
            <div className="flex flex-col justify-between p-4 pr-10">
              <h1 className="text-2xl font-bold dark:text-light">
                {post.title}
              </h1>
              <p>{post.content}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Posted by{" "}
                  <span className="text-light-text dark:text-light font-bold">
                    /{post.author}
                  </span>
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <BiMessageDetail />
                  <p>{post.comments}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
