import React from "react";
import CreateButtons from "./createButtons";

export default async function About() {
  return (
    <div className="w-full lg:rounded-md mb-2 hidden lg:flex flex-col items-center col-span-2 bg-light dark:bg-dark row-start-1 lg:row-start-auto lg:col-span-1">
      <div className="bg-about bg-cover w-full h-14 flex items-center px-6 lg:rounded-t-md" />
      <div className="w-full p-4 px-6 flex flex-col">
        <div className="mb-4">
          <h3 className="text-md">Home</h3>
          <div className="pt-4">
            <p className="text-gray-400 dark:text-dark-text text-sm line-clamp-3">
              Welcome to the Bluedit Homepage. Here you can explore every post
              from every community.
            </p>
            <CreateButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
