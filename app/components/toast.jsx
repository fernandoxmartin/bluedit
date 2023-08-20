"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast() {
  return (
    <div>
      <ToastContainer
        position="top-center"
        theme="colored"
        className={"w-[400px] text-sm"}
      />
    </div>
  );
}
