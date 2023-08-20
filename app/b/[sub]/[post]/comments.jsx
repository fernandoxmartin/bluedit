"use client";
import React from "react";
import axios from "axios";
import AddComment from "./addComment";
import CommentList from "./commentList";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function Comments() {
  const pathname = usePathname();

  const getPostComments = async () => {
    const postId = pathname.split("/")[3];
    const response = await axios.get(`/api/post/comments/${postId}`);
    return response.data.comments;
  };

  const commentsQuery = useQuery({
    queryKey: ["comments"],
    queryFn: getPostComments,
  });

  return (
    <div className="w-full bg-light dark:bg-dark mt-2 md:rounded-md">
      <AddComment />
      <CommentList query={commentsQuery} />
    </div>
  );
}
