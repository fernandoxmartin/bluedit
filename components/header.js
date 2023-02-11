import Link from "next/link";
import { Loginbtn } from "./login-btn";
import { NavBtn } from "./nav-btn";

export const Header = () => {
  return (
    <div className="h-14 w-full bg-light px-8 grid grid-cols-2 lg:grid-cols-3 dark:bg-dark">
      <h1 className="flex items-center text-primary text-md font-bold">
        Bluedit
      </h1>
      <div className="hidden lg:flex items-center">
        <input
          type="text"
          className="bg-light-bg w-full h-8 rounded text-center dark:bg-dark-bg dark:text-dark-text"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center justify-end">
        <Loginbtn />
        <NavBtn />
      </div>
    </div>
  );
};
