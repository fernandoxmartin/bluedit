"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { useGlobalContext } from "../context/store";
import { toast } from "react-toastify";

export default function CreatePostForm({ subs }) {
  const [sub, setSub] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const { setOpen } = useGlobalContext();

  const router = useRouter();

  const submitCreatePost = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/new/post", {
        sub,
        title,
        body,
      })
      .then((res) => {
        if (res.status == 200) {
          router.push(`/b/${res.data.sub.slug}/${res.data.id}`);
          toast.success("Your post was successfully created!");
          setOpen(false);
        }
      })
      .catch((error) => {
        setError(error.response.data.msg);
        toast.error(error.response.data.msg);
      });
  };

  const handleTitle = (e) => {
    setTitle(e);
  };
  const handleBody = (e) => {
    setBody(e);
  };
  const handleSub = (e) => {
    if (e === null) {
      setSub(null);
    } else {
      setSub(e.id);
    }
  };

  const selectStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderWidth: "2px",
      borderColor: "#f3f4f6",
      fontSize: "0.875rem",
    }),
  };

  return (
    <div className="p-4">
      <div className="my-6">
        <h1 className="text-xl font-bold">Create a Post</h1>
      </div>
      <form onSubmit={submitCreatePost} className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label htmlFor="sub" className="text-xs mb-2">
            Community
          </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            isClearable={true}
            required={true}
            options={subs}
            getOptionLabel={(sub) => sub.name}
            getOptionValue={(sub) => sub.id}
            name="sub"
            onChange={(e) => handleSub(e)}
            placeholder="Choose a community"
            instanceId={"select"}
            styles={selectStyles}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitle(e.target.value)}
            className="h-10 w-full rounded border-2 border-gray-100 px-2 text-sm dark:border-neutral-700"
            placeholder="Title"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-xs mb-2">Body</label>
          <textarea
            value={body}
            onChange={(e) => handleBody(e.target.value)}
            className="h-24 w-full rounded border-2 border-gray-100 p-2 text-sm dark:border-neutral-700"
            placeholder="Text (optional)"
          />
        </div>
        <button className="w-[150px] self-end bg-primary rounded p-2 text-light ">
          Submit
        </button>
      </form>
    </div>
  );
}
