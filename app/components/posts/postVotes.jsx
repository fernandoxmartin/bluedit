"use client";
import React from "react";
import axios from "axios";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function PostVotes({ post, user }) {
  const getPostVotes = async () => {
    const response = await axios.get("/api/post/vote", { post: post.id });
    return response.data;
  };

  const queryClient = useQueryClient();
  const votesQuery = useQuery({
    queryKey: ["votes"],
    queryFn: getPostVotes,
  });

  const postVotesCount = () => {
    if (votesQuery.data === undefined) {
      return 0;
    }
    const up = votesQuery.data.filter((vote) => vote.vote === true);
    const down = votesQuery.data.filter((vote) => vote.vote === false);
    const score = up.length - down.length;
    return score;
  };

  const onVote = async (vote) => {
    const existingVote = await votesQuery.data.find(
      (vote) => vote.userId === user.id
    );

    // add new vote
    if (!existingVote) {
      await axios.post("/api/post/vote", {
        postId: post.id,
        vote,
      });
    } else {
      // remove existing vote
      if (existingVote.vote === vote) {
        await axios.delete("/api/post/vote", {
          data: { voteId: existingVote.id },
        });
      } else {
        //update existing vote
        await axios.patch("/api/post/vote", {
          voteId: existingVote.id,
          vote,
        });
      }
    }
  };

  const voting = useMutation({
    mutationFn: (vote) => onVote(vote),
    onSuccess: () => {
      queryClient.invalidateQueries(["votes"]);
    },
  });

  return (
    <div className="flex items-center">
      <BiUpvote
        className={
          votesQuery?.data?.find((e) => e.userId === user.id)?.vote === true
            ? "text-orange-400 text-xl"
            : "text-light-text text-xl"
        }
        onClick={() => voting.mutate(true)}
      />
      <p className="px-1">{postVotesCount()}</p>
      <BiDownvote
        className={
          votesQuery?.data?.find((e) => e.userId === user.id)?.vote === false
            ? "text-orange-400 text-xl"
            : "text-light-text text-xl"
        }
        onClick={() => voting.mutate(false)}
      />
    </div>
  );
}
