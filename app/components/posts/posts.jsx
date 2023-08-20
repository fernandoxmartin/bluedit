"use client";
import PostCard from "./postCard";
import { usePathname } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGlobalContext } from "../../context/store";
import Skeleton from "../skeleton";
import axios from "axios";
import { useEffect } from "react";
import NoPosts from "./noPosts";

export default function Posts({ user }) {
  const pathname = usePathname();
  const { filter, setFilter } = useGlobalContext();

  useEffect(() => {
    setFilter("top");
  }, [setFilter]);

  const getPosts = async () => {
    const sub = pathname.split("/")[2];
    if (!sub) {
      const response = await axios.get(`/api/post`, {
        params: {
          sub: null,
          filter,
        },
      });
      return response.data;
    }
    const response = await axios.get(`/api/post`, {
      params: {
        sub: sub,
        filter,
      },
    });
    return response.data;
  };

  const postsQuery = useQuery({
    queryKey: ["posts", filter],
    queryFn: getPosts,
  });

  const { isLoading, error, data } = postsQuery;

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full space-y-2">
      {data.length < 1 ? (
        <NoPosts />
      ) : (
        data.map((post) => <PostCard key={post.id} post={post} user={user} />)
      )}
    </div>
  );
}
