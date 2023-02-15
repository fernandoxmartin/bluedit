import React, { useState } from "react";
import { Layout } from "@/components/layout";
import { CreateCommunity } from "@/components/create-community";
import { CreatePost } from "@/components/create-post";

export default function New() {
  const [form, setForm] = useState("post");

  const toggleForm = (e) => {
    setForm(e.target.value);
  };

  return (
    <Layout title={"new"}>
      <div className="w-full bg-light lg:rounded-xl col-span-2 mb-6 dark:bg-dark dark:text-dark-text">
        <div className="flex items-center justify-center">
          <button
            value="post"
            onClick={(e) => toggleForm(e)}
            className={
              form == "post"
                ? "w-full flex items-center justify-center bg-light py-4"
                : "w-full flex items-center justify-center bg-light-bg py-4"
            }
          >
            Post
          </button>
          <button
            value="community"
            onClick={(e) => toggleForm(e)}
            className={
              form == "community"
                ? "w-full flex items-center justify-center bg-light py-4"
                : "w-full flex items-center justify-center bg-light-bg py-4"
            }
          >
            Community
          </button>
        </div>
        {form == "post" ? <CreatePost /> : <CreateCommunity />}
      </div>
    </Layout>
  );
}