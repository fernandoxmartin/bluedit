"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

export default function JoinButton({ sub, user }) {
  const router = useRouter();
  const pathname = usePathname().slice(3);
  const [error, setError] = useState("");

  const handleUserJoin = async () => {
    // creator cannot leave community
    if (user.id === sub.userId) {
      alert("You cannot leave a community you created!");
      return;
    }
    // if not member => join, else leave
    if (
      sub.members.find((e) => e.userId === user.id) === false ||
      sub.members.length === 0
    ) {
      await axios
        .post(`/api/${pathname}/join`, {
          subId: sub.id,
        })
        .then((res) => {
          if (res.status == 200) {
            router.push(`/b/${pathname}`);
          }
        })
        .catch((error) => {
          setError(error.response.data.msg);
          console.log(error);
        });
    } else {
      await axios
        .delete(`/api/${pathname}/join`)
        .then((res) => {
          if (res.status == 200) {
            router.push(`/b/${pathname}`);
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
        className="bg-primary h-10 w-full mt-8 rounded-lg text-light"
      >
        {user.id === sub.userId || sub.members.find((e) => e.userId === user.id)
          ? "Joined"
          : "Join"}
      </button>
    </>
  );
}
