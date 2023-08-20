"use client";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export default function Feeds() {
  const bodyColor = [
    "9327D6",
    "384FD3",
    "26BFC9",
    "D89F32",
    "3DCC6E",
    "C84638",
    "F3F327",
  ];
  const bgColor = [
    "DFC7FF",
    "7FF0E9",
    "9BAAFC",
    "F5D3AC",
    "B3F3C1",
    "F5C9C9",
    "F3F3AF",
  ];

  const getUserFeeds = async () => {
    const response = await axios.get("/api/feeds");
    return response.data;
  };

  const queryClient = useQueryClient();
  const feedQuery = useQuery({
    queryKey: ["feeds"],
    queryFn: getUserFeeds,
  });

  const { isLoading, error, data } = feedQuery;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      {data.map((feed) => (
        <li key={feed.slug}>
          <Link href={`/b/${feed.slug}`} className="flex items-center my-4">
            <Image
              height={25}
              width={25}
              src={`https://api.dicebear.com/6.x/thumbs/svg?backgroundColor=${bgColor}&shapeColor=${bodyColor}&seed=${
                feed.slug || "placeholder"
              }.svg`}
              alt="user-image"
              className="rounded-full mr-2"
              priority
            />
            <span className="text-xl font-bold">{feed.name}</span>
          </Link>
        </li>
      ))}
    </div>
  );
}
