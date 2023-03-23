"use client";
import { useState } from "react";
import CreatePostForm from "./createPostForm";
import CreateSubForm from "./createSubForm";

export default function ToggleForms({ subs }) {
  const [isCreateForm, setCreateForm] = useState(true);

  const handleForm = () => {
    setCreateForm(!isCreateForm);
  };

  return (
    <div className="w-full bg-light lg:rounded-xl col-span-2 mt-2 mb-6 dark:bg-dark dark:text-dark-text">
      <div className="flex items-center justify-center">
        <button
          onClick={() => handleForm()}
          disabled={isCreateForm}
          className={
            isCreateForm
              ? "w-full flex items-center justify-center bg-light py-4 border-t-4 border-t-primary disabled:bg-light"
              : "w-full flex items-center justify-center bg-light-bg py-4 border-t-4 border-t-transparent"
          }
        >
          Post
        </button>
        <button
          onClick={() => handleForm()}
          disabled={!isCreateForm}
          className={
            !isCreateForm
              ? "w-full flex items-center justify-center bg-light py-4 border-t-4 border-t-primary disabled:bg-light"
              : "w-full flex items-center justify-center bg-light-bg py-4 border-t-4 border-t-transparent"
          }
        >
          Community
        </button>
      </div>
      {isCreateForm ? <CreatePostForm subs={subs} /> : <CreateSubForm />}
    </div>
  );
}
