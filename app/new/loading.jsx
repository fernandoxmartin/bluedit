export default function Loading() {
  return (
    <div className="w-full space-y-4">
      <div className="h-72 bg-light p-4 lg:p-6 lg:rounded-xl flex flex-col justify-between lg:mb-6 dark:bg-dark dark:text-dark-text animate-pulse">
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
  );
}
