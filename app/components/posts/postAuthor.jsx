"use client";
import Link from "next/link";
import TimeAgo from "react-timeago";
import { usePathname } from "next/navigation";

export default function PostAuthor({ post }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center mb-4 text-xs text-gray-400">
      <Link
        href={`/b/${post.sub.slug}`}
        className={`flex items-center ${pathname === "/" ? "" : "hidden"}`}
      >
        <div className="w-4 h-4 bg-primary rounded-full mr-2"></div>
        <p className="text-light-text dark:text-light">b/{post.sub.slug}</p>
        <p className="ml-2 font-black">·</p>
      </Link>

      <div className={`flex items-center ${pathname === "/" ? "hidden" : ""}`}>
        <div className="w-4 h-4 bg-primary rounded-full mr-2"></div>
        <p>Posted by</p>
        <span>&nbsp;u/{post.user.name.split(" ").join("").toLowerCase()}</span>
        <p className="ml-2 font-black">·</p>
      </div>

      <div className="ml-2">
        <TimeAgo date={post.createdAt} />
      </div>
    </div>
  );
}
