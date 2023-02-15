import Link from "next/link";
import React from "react";
import { ImPlus } from "react-icons/im";

export const MobileCreate = () => {
  return (
    <Link href={"/new"}>
      <button className="w-14 h-14 rounded bg-primary text-light flex items-center justify-center fixed bottom-5 right-5">
        <ImPlus className="text-xl" />
      </button>
    </Link>
  );
};
