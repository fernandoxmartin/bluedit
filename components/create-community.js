import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export const CreateCommunity = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const submitCreateCommunity = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/new/sub", {
        name,
        description,
      })
      .then((res) => {
        if (res.status == 200) {
          router.push("/");
        }
      })
      .catch((error) => {
        setError(error.response.data.msg);
      });
  };

  const handleName = (e) => {
    setName(e);
  };
  const handleDesc = (e) => {
    setDescription(e);
  };

  return (
    <div className="p-4">
      <form onSubmit={submitCreateCommunity} className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label className="text-xs mb-2">Community Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleName(e.target.value)}
            className="h-10 w-full bg-light-bg"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-xs mb-2">Community Description</label>
          <textarea
            value={description}
            onChange={(e) => handleDesc(e.target.value)}
            className="h-24 w-full bg-light-bg"
          >
            description
          </textarea>
        </div>
        <button className="bg-primary rounded p-2 text-light">Submit</button>
      </form>
    </div>
  );
};
