"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Select from "react-select";

export default function CreatePostForm({ subs }) {
  const [sub, setSub] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

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
          router.push("/");
        }
      })
      .catch((error) => {
        setError(error.response.data.msg);
        console.log(error);
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

  return (
    <div className="p-4">
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
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitle(e.target.value)}
            className="h-10 w-full bg-light-bg"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-xs mb-2">Body</label>
          <textarea
            value={body}
            onChange={(e) => handleBody(e.target.value)}
            className="h-24 w-full bg-light-bg"
            required
          />
        </div>
        <button className="bg-primary rounded p-2 text-light">Submit</button>
      </form>
    </div>
  );
}
