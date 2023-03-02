import { BiUpvote, BiDownvote, BiMessageDetail } from "react-icons/bi";
import Link from "next/link";
import TimeAgo from "react-timeago";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const PostCard = ({ posts, user }) => {
  const router = useRouter();
  const sub = router.query.sub;
  const { data: session } = useSession();
  const [error, setError] = useState();

  const onVote = async (post, vote) => {
    if (!session) {
      alert("You must be logged in to Join!");
      return;
    }
    const existingVote = post.post_votes.find(
      (vote) => vote.userId === user.id
    );

    // add new vote
    if (!existingVote) {
      await axios
        .post("/api/post/vote", {
          postId: post.id,
          vote,
        })
        .then((res) => {
          if (res.status == 200) {
            router.push(`/b/${router.query.sub}`);
          }
        })
        .catch((error) => {
          setError(error.response.data.msg);
          console.log(error);
        });
    } else {
      // remove existing vote
      if (existingVote.vote === vote) {
        await axios
          .delete("/api/post/vote", {
            data: { voteId: existingVote.id },
          })
          .then((res) => {
            if (res.status == 200) {
              router.push(`/b/${router.query.sub}`);
            }
          })
          .catch((error) => {
            setError(error.response.data.msg);
            console.log(error);
          });
      } else {
        //update existing vote
        await axios
          .patch("/api/post/vote", {
            voteId: existingVote.id,
            vote,
          })
          .then((res) => {
            if (res.status == 200) {
              router.push(`/b/${router.query.sub}`);
            }
          })
          .catch((error) => {
            setError(error.response.data.msg);
            console.log(error);
          });
      }
    }
  };

  const postVotesCount = (post) => {
    const up = post.post_votes.filter((vote) => vote.vote === true);
    const down = post.post_votes.filter((vote) => vote.vote === false);
    const score = up.length - down.length;
    return score;
  };

  return (
    <>
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className="h-72 bg-light p-4 lg:rounded-xl flex flex-col mb-2 dark:bg-dark dark:text-dark-text"
          >
            {/* Header */}
            <div className="row-span-2 mb-4">
              <div className="flex items-center mb-4 text-xs text-gray-400">
                <Link
                  href={`/b/${post.subname}`}
                  className={`flex items-center  ${
                    sub !== post.subname ? "" : "hidden"
                  }`}
                >
                  <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                  <p className="text-light-text dark:text-light">
                    b/{post.subname}
                  </p>
                  <p className="ml-2 font-black">·</p>
                </Link>

                <p
                  className={`${
                    sub !== post.subname ? "hidden lg:flex ml-2" : ""
                  }`}
                >
                  Posted by <span>u/{post.username}</span>
                </p>

                <div className="ml-2">
                  <TimeAgo date={post.createdAt} />
                </div>
              </div>
              <h2 className="text-xl font-bold line-clamp-2 dark:text-light">
                {post.title}
              </h2>
            </div>

            {/* Body */}
            <div className="h-full w-full row-span-3 relative -z-5 overflow-hidden ">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-light via-light dark:via-dark dark:from-dark"></div>
              <p className="line-clamp-3 text-gray-600 dark:text-dark-text text-sm">
                {post.body}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <BiUpvote
                  className={
                    session &&
                    post.post_votes.find((e) => e.userId === user.id)?.vote ===
                      true
                      ? "text-orange-400 text-xl"
                      : "text-light-text text-xl"
                  }
                  onClick={() => onVote(post, true)}
                />
                <p className="px-1">{postVotesCount(post)}</p>
                <BiDownvote
                  className={
                    session &&
                    post.post_votes.find((e) => e.userId === user.id)?.vote ===
                      false
                      ? "text-orange-400 text-xl"
                      : "text-light-text text-xl"
                  }
                  onClick={() => onVote(post, false)}
                />
              </div>
              <div className="flex items-center">
                <p className="pr-1">
                  {!post.comments ? "0" : post.comments.length}
                </p>
                <BiMessageDetail className="text-xl" />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
