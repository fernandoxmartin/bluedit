"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostCard from "../components/posts/postCard";
import { useGlobalContext } from "../context/store";
import Null from "./null";
import Link from "next/link";
import UserAvatar from "../components/userAvatar";

export default function Results({ user }) {
  const params = useSearchParams();
  const q = params.get("q");
  const { search, setSearch } = useGlobalContext();

  useEffect(() => {
    setSearch(q);
  }, [setSearch, q]);

  const getPostResults = async () => {
    if (!q) {
      return null;
    }
    const response = await axios.get(`/api/search/post`, {
      params: { q },
    });
    return response.data;
  };

  const getSubResults = async () => {
    if (!q) {
      return null;
    }
    const response = await axios.get(`/api/search/sub`, {
      params: { q },
    });
    return response.data;
  };

  const postResultsQuery = useQuery({
    queryKey: ["postResults", search],
    queryFn: getPostResults,
  });

  const subResultsQuery = useQuery({
    queryKey: ["subResults", search],
    queryFn: getSubResults,
  });

  const postData = postResultsQuery.data;
  const postIsLoading = postResultsQuery.isLoading;
  const subData = subResultsQuery.data;
  const subIsLoading = subResultsQuery.isLoading;

  if (postIsLoading) {
    return <>Loading...</>;
  }
  if (subIsLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="space-y-2 col-span-2 lg:col-span-1">
        {postData && postData.length > 0 ? (
          postData.map((post) => (
            <PostCard key={post.id} post={post} user={user} />
          ))
        ) : (
          <Null query={q} />
        )}
      </div>
      <div className="space-y-2 row-start-2 col-span-2 lg:col-span-1 lg:row-auto">
        <div className='min-h-[288px] lg:flex w-full flex-col items-center rounded-md bg-light dark:bg-dark lg:mb-6 p-6"'>
          <div className="w-full p-6">
            <h2 className="w-full mb-4">Communities</h2>
            <div className="w-full border-b-[0.5px] border-gray-300 dark:border-neutral-700 mb-2"></div>
            {subData && subData.length > 0 ? (
              subData.map((sub) => {
                return (
                  <Link href={`/b/${sub.slug}`} key={sub.id}>
                    <li className="flex items-center p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700">
                      <UserAvatar size={25} space={2} user={sub.slug} />
                      <p className="text-sm">
                        <span className="text-xs text-neutral-400">b/</span>
                        {sub.slug}
                      </p>
                      <p className="px-2">·</p>
                      <p className="text-xs text-neutral-400">
                        {sub._count.members + 1}
                        {sub._count.members + 1 === 1 ? " member" : " members"}
                      </p>
                    </li>
                  </Link>
                );
              })
            ) : (
              <p className="text-sm py-2">No Results</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
