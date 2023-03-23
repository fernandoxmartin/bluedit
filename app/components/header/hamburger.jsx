"use client";

import { useGlobalContext } from "../../context/store";

export default function Hamburger() {
  const { toggleNav, isOpen } = useGlobalContext();

  return (
    <button
      onClick={toggleNav}
      className="ml-8 mr-6 text-lg relative lg:hidden"
    >
      <div
        className={
          isOpen
            ? `absolute top-0.5 
            before:content-['']
            before:transition-all 
            before:w-6 
            before:h-0.5 
            before:rounded-xl 
            before:-translate-x-1 
            before:-translate-y-0.5
             before:bg-light-text 
             before:absolute 
             before:-rotate-45 
             after:content-[''] 
             after:transition-all 
             after:w-6 
             after:h-0.5 
             after:rounded-xl 
             after:-translate-x-1
             after:-translate-y-0.5
             after:bg-light-text 
             after:absolute
             after:rotate-45
             dark:before:bg-light
             dark:after:bg-light
             `
            : `absolute top-0.5  
            before:content-[''] 
            before:transition-all 
            before:w-6 
            before:h-0.5 
            before:rounded-xl 
            before:-translate-x-0 
            before:-translate-y-1.5
             before:bg-light-text 
             before:absolute
             after:content-[''] 
             after:transition-all 
             after:w-6 
             after:h-0.5 
             after:rounded-xl 
             after:-translate-x-1
             after:bg-light-text 
             after:absolute
             dark:before:bg-light
             dark:after:bg-light
             `
        }
      ></div>
    </button>
  );
}
