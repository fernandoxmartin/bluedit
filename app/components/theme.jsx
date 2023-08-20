"use client";
import {
  BiHome,
  BiRocket,
  BiBarChartAlt2,
  BiCertification,
  BiCircle,
  BiSun,
  BiMoon,
} from "react-icons/bi";
import { useGlobalContext } from "@/app/context/store";

export default function Theme() {
  const { theme, handleTheme } = useGlobalContext();
  return (
    <div className="flex items-center my-6 gap-2">
      <div className="text-2xl">
        <BiSun />
      </div>
      <label className="relative inline-flex items-center cursor-pointer ">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={handleTheme}
          checked={theme == "dark" ? true : false}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 "></div>
      </label>
      <div className="text-2xl">
        <BiMoon />
      </div>
    </div>
  );
}
