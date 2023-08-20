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
    <div className="w-full bg-light rounded-lg lg:rounded-xl mt-2 mb-6 p-4 lg:p-6 dark:bg-dark dark:text-dark-text">
      <div className="flex items-center justify-center border-b-4 border-b-gray-100 dark:border-b-neutral-700">
        <button
          onClick={() => handleForm()}
          disabled={isCreateForm}
          className={
            isCreateForm
              ? "w-full flex items-center justify-center bg-light dark:bg-dark py-4 rounded-t border-t-4 border-t-primary disabled:bg-gray-100 dark:disabled:bg-neutral-700"
              : "w-full flex items-center justify-center bg-light dark:bg-dark py-4 rounded border-t-4 border-t-transparent"
          }
        >
          Post
        </button>
        <button
          onClick={() => handleForm()}
          disabled={!isCreateForm}
          className={
            !isCreateForm
              ? "w-full flex items-center justify-center bg-light dark:bg-dark py-4 rounded-t border-t-4 border-t-primary disabled:bg-gray-100 dark:disabled:bg-neutral-700"
              : "w-full flex items-center justify-center bg-light dark:bg-dark py-4 rounded border-t-4 border-t-transparent"
          }
        >
          Community
        </button>
      </div>
      {isCreateForm ? <CreatePostForm subs={subs} /> : <CreateSubForm />}
    </div>
  );
}
