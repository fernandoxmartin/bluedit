"use client";

export default function ToastButton() {
  return (
    <>
      <button
        onClick={() => alert("You must be logged in to Join!")}
        className="bg-primary h-10 w-full mt-8 rounded-lg text-light"
      >
        Join
      </button>
    </>
  );
}
