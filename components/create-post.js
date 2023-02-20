import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export const CreatePost = ({ subs }) => {
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
    setSub(e);
  };

  return (
    <div className="p-4">
      <form onSubmit={submitCreatePost} className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label htmlFor="sub" className="text-xs mb-2">
            Community
          </label>
          <select
            id="sub"
            value={sub}
            onChange={(e) => handleSub(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option disabled hidden value="">
              Choose a community
            </option>
            {subs.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
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
};
