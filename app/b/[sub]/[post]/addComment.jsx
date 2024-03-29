"use client";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddComment() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();
  const pathname = usePathname();

  const handleComment = (e) => {
    setComment(e);
  };

  const addComment = async () => {
    const postId = pathname.split("/")[3];
    await axios.post(`/api/post/comments/${postId}`, {
      comment,
    });
  };

  const submitComment = useMutation({
    mutationFn: () => addComment(),
    onSuccess: () => {
      toast.success("Your comment was successfully posted!");
      queryClient.invalidateQueries(["comments"]);
      queryClient.invalidateQueries(["commentCount"]);
      setComment("");
      setFormOpen(false);
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  return (
    <div className="p-4">
      {isFormOpen ? (
        <div className="w-full ">
          <textarea
            className="w-full h-24 p-4 border dark:border-neutral-700 rounded-lg text-gray-700 text-sm dark:text-dark-text"
            placeholder="Leave a comment"
            value={comment}
            autoFocus={true}
            onChange={(e) => handleComment(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <CgClose
              className="text-2xl text-gray-700 dark:text-neutral-700 cursor-pointer"
              onClick={() => setFormOpen(false)}
            />
            <button
              className="bg-primary px-4 h-8 text-sm text-light rounded cursor-pointer disabled:bg-gray-500"
              disabled={comment.length < 1 ? true : false}
              onClick={() => submitComment.mutate()}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <button
          className="w-full h-10 p-4 border dark:border-neutral-700 rounded-lg flex items-center text-sm text-gray-700 dark:text-dark-text"
          onClick={() => setFormOpen(true)}
        >
          Leave a comment
        </button>
      )}
    </div>
  );
}
