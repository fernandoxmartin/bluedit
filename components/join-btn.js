import React, { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

export const JoinBtn = ({ sub, user }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleUserJoin = async () => {
    // check if user, if not, prompt to log in
    if (!session) {
      alert("You must be logged in to Join!");
      return;
    }
    // creator cannot leave community
    if (user.id === sub.userId) {
      alert("You cannot leave a community you created!");
      return;
    }
    // if not member => join, else leave
    if (sub.members.find((e) => e.userId === user.id) === false) {
      await axios
        .post(`/api/${router.query.sub}/join`, {
          subId: sub.id,
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
      await axios
        .delete(`/api/${router.query.sub}/join`)
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
  };

  return (
    <>
      <button
        onClick={() => handleUserJoin()}
        className={`bg-primary h-10 w-full mt-8 rounded-lg text-light disabled:bg-gray-400`}
      >
        {session &&
        (user.id === sub.userId ||
          sub.members.find((e) => e.userId === user.id))
          ? "Joined"
          : "Join"}
      </button>
    </>
  );
};
