import React from "react";
import { PostCard } from "./post-card";

export const Posts = () => {
  // dummy data for now, add database data here
  const posts = [
    {
      id: 1,
      votes: 10,
      title: "This is an example title",
      content: "aosidjf osaidhf osaiudhf iusa dfiuasbdfiu asoidfu saoiudfb asd",
      author: "user",
      comments: 3,
    },
    {
      id: 2,
      votes: 7,
      title: "This is an example title 2",
      content: "aosidjf osaidhf osaiudhf iusa dfiuasbdfiu asoidfu saoiudfb asd",
      author: "user 2",
      comments: 2,
    },
  ];

  return (
    <div className="w-full col-span-2">
      <PostCard posts={posts} />
    </div>
  );
};
