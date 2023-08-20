"use client";
import { toast } from "react-toastify";

export default function ToastButton() {
  return (
    <>
      <button
        onClick={() => toast.error("You must be logged in to join!")}
        className="bg-primary h-10 w-full mt-8 rounded-lg text-light"
      >
        Join
      </button>
    </>
  );
}
