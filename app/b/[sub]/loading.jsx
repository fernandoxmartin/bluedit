import React from "react";

export default function Loading() {
  return (
    <div className="w-full grid lg:grid-cols-[650px_auto] gap-2 lg:gap-4 mt-4">
      <div className="space-y-2">
        <div className="h-14 w-full bg-light dark:bg-dark mb-2 flex items-center justify-between px-4  lg:rounded-md">
          <div className="flex space-x-4">
            <div className="w-16 h-8 bg-gray-300 dark:bg-neutral-500 rounded" />
            <div className="w-16 h-8 bg-gray-300 dark:bg-neutral-500 rounded" />
            <div className="w-16 h-8 bg-gray-300 dark:bg-neutral-500 rounded" />
          </div>
        </div>
        <div className="h-72 bg-light p-4 lg:p-6 lg:rounded-md flex flex-col justify-between lg:mb-6 dark:bg-dark dark:text-dark-text animate-pulse">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-gray-300 dark:bg-neutral-500" />
              <div className="h-4 w-24 ml-2 rounded bg-gray-300 dark:bg-neutral-500" />
              <p className="ml-2 font-black text-gray-300">·</p>
              <div className="ml-2 h-4 w-16 rounded bg-gray-300 dark:bg-neutral-500" />
            </div>
            <div className="space-y-4">
              <div className="h-8 w-full rounded bg-gray-300 dark:bg-neutral-500" />
              <div className="h-16 w-full rounded bg-gray-300 dark:bg-neutral-500" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="h-4 w-16 rounded bg-gray-300 dark:bg-neutral-500" />
            <div className="h-4 w-16 rounded bg-gray-300 dark:bg-neutral-500" />
          </div>
        </div>
      </div>
      <div className="space-y-2 row-start-1 lg:row-auto">
        <div className="w-full h-full max-h-96 lg:rounded-md mb-2 flex flex-col items-center col-span-2 bg-light dark:bg-dark row-start-1 lg:row-start-auto lg:col-span-1">
          <div className="bg-primary w-full h-20 lg:h-14 flex items-center justify-center lg:rounded-t-md" />
          <div className="w-full p-4 px-6 flex flex-col">
            <div className="mb-4">
              <h3 className=" h-4 w-24 bg-gray-300 dark:bg-neutral-500 rounded" />
              <div className="py-4">
                <p className="h-6 w-full bg-gray-300 dark:bg-neutral-500 rounded "></p>
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div className="flex flex-col mr-12">
                <p className="h-4 w-16 bg-gray-300 dark:bg-neutral-500 rounded" />
                <p className="h-6 w-24 bg-gray-300 dark:bg-neutral-500 rounded mt-4" />
              </div>
              <div className="flex flex-col items-end">
                <p className="h-4 w-16 bg-gray-300 dark:bg-neutral-500 rounded" />
                <p className="h-6 w-10 bg-gray-300 dark:bg-neutral-500 rounded mt-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
