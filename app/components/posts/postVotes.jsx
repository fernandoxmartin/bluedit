"use client";
import React, { useState } from "react";
import axios from "axios";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function PostVotes({ post, user }) {
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
        .then((res) => setVoteCount(res.data.voteCount.voteCount));
    } else {
      // remove existing vote
      if (existingVote.vote === vote) {
        await axios
          .delete("/api/post/vote", {
            data: { voteId: existingVote.id, postId: post.id, vote },
          })
          .then((res) => setVoteCount(res.data.voteCount.voteCount));
      } else {
        //update existing vote
        await axios
          .patch("/api/post/vote", {
            voteId: existingVote.id,
            vote,
            postId: post.id,
          })
          .then((res) => setVoteCount(res.data.voteCount.voteCount));
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
    <div className="flex items-center">
      <BiUpvote
        className={
          votesQuery?.data?.find(
            (e) => e.userId === user.id && e.postId === post.id
          )?.vote === true
            ? "text-orange-400 text-xl"
            : "text-light-text text-xl"
        }
        onClick={() => voting.mutate(true)}
      />
      <p className="px-1">{voteCount}</p>
      <BiDownvote
        className={
          votesQuery?.data?.find(
            (e) => e.userId === user.id && e.postId === post.id
          )?.vote === false
            ? "text-orange-400 text-xl"
            : "text-light-text text-xl"
        }
        onClick={() => voting.mutate(false)}
      />
    </div>
  );
}
