import React from "react";
import { PostCard } from "./post-card";

export const Posts = ({ posts }) => {
  return (
    <div className="w-full col-span-2">
      <PostCard posts={posts} />
    </div>
  );
};
