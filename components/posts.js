import React from "react";
import { PostCard } from "./post-card";

export const Posts = () => {
  // dummy data for now, add database data here
  const posts = [
    {
      id: 1,
      votes: 256,
      title:
        "This is an example title aisudbf kjhbasdl fhbalsd fbkiabs dfkhbas dkfa",
      content:
        "aosidjf osaidhf osaiudhf iusa dfiuasbdfiu asoidfu saoiudfb asd qiwuegri welriu wegr isbdgfksd fkghbdkf gdbhf gbkds fha sidufhb siduhbf sikabdf kahsbdkf hbsakdfhb lsadhfbiasdhbgfdsh",
      user: "user",
      sub: "example",
      comments: 3,
    },
    {
      id: 2,
      votes: 106,
      title: "This is an example title 2",
      content: "aosidjf osaidhf osaiudhf iusa dfiuasbdfiu asoidfu saoiudfb asd",
      user: "user2",
      sub: "example",
      comments: 2,
    },
  ];

  return (
    <div className="w-full col-span-2">
      <PostCard posts={posts} />
    </div>
  );
};
