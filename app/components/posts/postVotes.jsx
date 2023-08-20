"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  BiUpvote,
  BiSolidUpvote,
  BiDownvote,
  BiSolidDownvote,
} from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function PostVotes({ post, user, hidden }) {
  const [voteCount, setVoteCount] = useState(post.voteCount);

  const getPostVotes = async () => {
    const response = await axios.get("/api/post/vote");
    return response.data;
  };

  const queryClient = useQueryClient();
  const votesQuery = useQuery({
    queryKey: ["votes"],
    queryFn: getPostVotes,
  });

  const onVote = async (vote) => {
    const existingVote = await votesQuery.data.find(
      (vote) => vote.userId === user.id && vote.postId === post.id
    );

    // add new vote
    if (!existingVote) {
      await axios
        .post("/api/post/vote", {
          postId: post.id,
          vote,
        })
        .then((res) => setVoteCount(res.data.voteCount.voteCount))
        .catch((error) => {
          setError(error.response.data.msg);
          toast.error(error.response.data.msg);
        });
    } else {
      // remove existing vote
      if (existingVote.vote === vote) {
        await axios
          .delete("/api/post/vote", {
            data: { voteId: existingVote.id, postId: post.id, vote },
          })
          .then((res) => setVoteCount(res.data.voteCount.voteCount))
          .catch((error) => {
            setError(error.response.data.msg);
            toast.error(error.response.data.msg);
          });
      } else {
        //update existing vote
        await axios
          .patch("/api/post/vote", {
            voteId: existingVote.id,
            vote,
            postId: post.id,
          })
          .then((res) => setVoteCount(res.data.voteCount.voteCount))
          .catch((error) => {
            setError(error.response.data.msg);
            toast.error(error.response.data.msg);
          });
      }
    }
  };

  const voting = useMutation({
    mutationFn: (vote) => onVote(vote),
    onSuccess: () => {
      queryClient.invalidateQueries(["votes"], "voteCount");
    },
  });

  return (
    <div
      className={`flex items-center  ${
        hidden === true ? "md:hidden" : "md:flex-col"
      }`}
    >
      {/* <BiSolidUpvote
        className={
          votesQuery?.data?.find(
            (e) => e.userId === user.id && e.postId === post.id
          )?.vote === true
            ? "text-primary text-xl cursor-pointer"
            : "text-light-text text-xl cursor-pointer"
        }
        onClick={() => voting.mutate(true)}
      /> */}

      {votesQuery?.data?.find(
        (e) => e.userId === user.id && e.postId === post.id
      )?.vote === true ? (
        <BiSolidUpvote
          className="text-primary text-xl cursor-pointer"
          onClick={() => voting.mutate(true)}
        />
      ) : (
        <BiUpvote
          className="text-light-text text-xl cursor-pointer dark:text-dark-text"
          onClick={() => voting.mutate(true)}
        />
      )}

      <p className="px-2 md:py-2">{voteCount}</p>

      {/* <BiDownvote
        className={
          votesQuery?.data?.find(
            (e) => e.userId === user.id && e.postId === post.id
          )?.vote === false
            ? "text-primary text-xl cursor-pointer"
            : "text-light-text text-xl cursor-pointer"
        }
        onClick={() => voting.mutate(false)}
      /> */}

      {votesQuery?.data?.find(
        (e) => e.userId === user.id && e.postId === post.id
      )?.vote === false ? (
        <BiSolidDownvote
          className="text-primary text-xl cursor-pointer"
          onClick={() => voting.mutate(false)}
        />
      ) : (
        <BiDownvote
          className="text-light-text text-xl cursor-pointer dark:text-dark-text"
          onClick={() => voting.mutate(false)}
        />
      )}
    </div>
  );
}
