"use client";
import React from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { BiMessageDetail } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";

const PostCommentsCount = () => {
  const pathname = usePathname();

  const getPostCommentsCount = async () => {
    const postId = pathname.split("/")[3];
    const response = await axios.get(`/api/post/comments/${postId}`);
    return response.data.comments.length;
  };

  const commentCountQuery = useQuery({
    queryKey: ["commentCount"],
    queryFn: getPostCommentsCount,
  });

  const { isLoading, error, data } = commentCountQuery;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <p className="pr-1">{data}</p>
      <BiMessageDetail className="text-xl" />
    </>
  );
};

export default function PostComments({ post }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center text-gray-400 text-sm md:text-xs">
      {pathname === `/b/${post.sub.slug}/${post.id}` ? (
        <PostCommentsCount />
      ) : (
        <>
          <p className="pr-1">{post?.comments?.length}</p>
          <BiMessageDetail className="text-base" />
        </>
      )}
    </div>
  );
}
