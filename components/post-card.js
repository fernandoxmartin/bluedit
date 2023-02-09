import { BiUpvote, BiDownvote, BiMessageDetail } from "react-icons/bi";

export const PostCard = ({ posts }) => {
  return (
    <>
      {posts.map((post) => {
        return (
          <div key={post.id} className="h-60 bg-light rounded-xl flex mb-6">
            <div className="w-1/6 flex flex-col items-center pt-4">
              <BiUpvote className="text-xl" />
              <p className="p-4">{post.votes}</p>
              <BiDownvote className="text-xl" />
            </div>
            <div className="flex flex-col justify-between p-4 pr-10">
              <h1 className="text-2xl font-bold">{post.title}</h1>
              <p>{post.content}</p>
              <div className="flex items-center justify-between">
                <p>Posted by /{post.author}</p>
                <div className="flex items-center gap-2">
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
