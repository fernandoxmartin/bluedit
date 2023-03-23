"use client";
import Image from "next/image";

export default function User({ image }) {
  return (
    <div className="hidden lg:block">
      <Image
        height={30}
        width={30}
        src={image}
        alt="user-image"
        className="rounded-full"
        priority
      />
    </div>
  );
}
