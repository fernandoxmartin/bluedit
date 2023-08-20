"use client";
import React from "react";
import { BiBarChartAlt2 } from "react-icons/bi";
import { FiStar } from "react-icons/fi";
import { SlOptions } from "react-icons/sl";
import { BiRocket } from "react-icons/bi";
import { useGlobalContext } from "../../context/store";

export default function Filter() {
  const { filter, setFilter } = useGlobalContext();

  const options = [
    {
      value: "top",
      icon: <BiBarChartAlt2 className="mr-2 text-xl" />,
    },
    {
      value: "new",
      icon: <FiStar className="mr-2 text-xl" />,
    },
    {
      value: "comments",
      icon: <BiRocket className="mr-2 text-xl" />,
    },
  ];

  const handleChange = (e) => {
    setFilter(e);
  };

  const filterStyle =
    "flex items-center p-2 rounded text-sm capitalize font-medium hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-400";

  return (
    <div className="h-14 w-full bg-light dark:bg-dark mb-2 flex items-center justify-between px-4  lg:rounded-md">
      <div className="flex space-x-4">
        {options.map((option, index) => {
          return (
            <button
              key={index}
              className={`${
                filter === option.value
                  ? `${filterStyle} bg-gray-200 dark:bg-gray-700 text-primary dark:text-white`
                  : `${filterStyle}`
              }`}
              onClick={() => handleChange(option.value)}
            >
              {option.icon}
              {option.value}
            </button>
          );
        })}
      </div>
      <div className="text-gray-400 text-xl cursor-pointer">
        <SlOptions />
      </div>
    </div>
  );
}
