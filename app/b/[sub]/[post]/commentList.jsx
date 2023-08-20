import React from "react";
import TimeAgo from "react-timeago";

export default function CommentList({ query }) {
  const { isLoading, error, data } = query;

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      {data.map((comment) => (
        <div key={comment.id} className="my-4 ">
          <div className="flex text-xs">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-primary rounded-full mr-2"></div>
              <p className=" font-semibold">
                {comment.user.name.split(" ").join("").toLowerCase()}
              </p>
              <p className="ml-2 font-black">·</p>
            </div>
            <div className="ml-2 text-gray-400">
              <TimeAgo date={comment.createdAt} />
            </div>
          </div>

          <div className="mt-2 mb-6 pl-6 text-xs">{comment.message}</div>
        </div>
      ))}
    </div>
  );
}
