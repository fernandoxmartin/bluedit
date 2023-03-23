"use client";
import { BiUpvote, BiDownvote } from "react-icons/bi";

export default function ToastVotes({ post }) {
  const postVotesCount = (post) => {
    const up = post.post_votes.filter((vote) => vote.vote === true);
    const down = post.post_votes.filter((vote) => vote.vote === false);
    const score = up.length - down.length;
    return score;
  };

  return (
    <div className="flex items-center">
      <BiUpvote
        className="text-light-text text-xl"
        onClick={() => alert("Please log in to vote on a Post!")}
      />
      <p className="px-1">{postVotesCount(post)}</p>
      <BiDownvote
        className="text-light-text text-xl"
        onClick={() => alert("Please log in to vote on a Post!")}
      />
    </div>
  );
}
