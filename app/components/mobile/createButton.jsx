"use client";
import { ImPlus } from "react-icons/im";
import Link from "next/link";
import { useGlobalContext } from "@/app/context/store";

export default function CreateButton() {
  const { setOpen } = useGlobalContext();

  return (
    <Link href="/new" onClick={() => setOpen(true)}>
      <button className="w-14 h-14 rounded bg-primary text-light flex items-center justify-center fixed bottom-5 right-5 lg:hidden">
        <ImPlus className="text-xl" />
      </button>
    </Link>
  );
}
