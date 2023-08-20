"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useGlobalContext } from "../context/store";
import { toast } from "react-toastify";

export default function CreateSubForm() {
  const [subname, setSubname] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const { setOpen } = useGlobalContext();

  const router = useRouter();

  const submitCreateCommunity = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/new/sub", {
        subname,
        description,
      })
      .then((res) => {
        if (res.status == 200) {
          router.push(`/b/${res.data.slug}`);
          toast.success(`b/${res.data.slug} was successfully created!`);
          setOpen(false);
        }
      })
      .catch((error) => {
        setError(error.response.data.msg);
        toast.error(error.response.data.msg);
      });
  };

  const handleSubname = (e) => {
    setSubname(e);
  };
  const handleDesc = (e) => {
    setDescription(e);
  };

  return (
    <div className="p-4">
      <div className="my-6">
        <h1 className="text-xl font-bold">Create a Community</h1>
      </div>
      <form onSubmit={submitCreateCommunity} className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label className="text-xs mb-2">Name</label>
          <input
            type="text"
            value={subname}
            onChange={(e) => handleSubname(e.target.value)}
            className="h-10 w-full rounded border-2 border-gray-100 px-2 text-sm dark:border-neutral-700"
            placeholder="Name"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-xs mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => handleDesc(e.target.value)}
            className="h-24 w-full rounded border-2 border-gray-100 p-2 text-sm dark:border-neutral-700"
            placeholder="Text (optional)"
            required
          >
            description
          </textarea>
        </div>
        <button className="w-[150px] self-end bg-primary rounded p-2 text-light">
          Submit
        </button>
      </form>
    </div>
  );
}
