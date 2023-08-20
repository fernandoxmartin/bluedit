"use client";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { toast } from "react-toastify";

export default function ToastVotes({ post, hidden }) {
  const postVotesCount = (post) => {
    const up = post.post_votes.filter((vote) => vote.vote === true);
    const down = post.post_votes.filter((vote) => vote.vote === false);
    const score = up.length - down.length;
    return score;
  };

  return (
    <div
      className={`flex items-center  ${
        hidden === true ? "md:hidden" : "md:flex-col"
      }`}
    >
      <BiUpvote
        className="text-light-text text-xl cursor-pointer dark:text-dark-text"
        onClick={() => toast.error("Please log in to vote on a Post!")}
      />
      <p className="px-2 md:py-2">{postVotesCount(post)}</p>
      <BiDownvote
        className="text-light-text text-xl cursor-pointer dark:text-dark-text"
        onClick={() => toast.error("Please log in to vote on a Post!")}
      />
    </div>
  );
}
