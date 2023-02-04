import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Loginbtn } from "./login-btn";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="h-20 w-full bg-light px-8 grid grid-cols-3">
      <h1 className="flex items-center text-light-primary text-lg font-bold">
        Bluedit
      </h1>
      <div className="flex items-center">
        <input
          type="text"
          className="bg-light-bg w-full h-8 rounded text-center"
        />
      </div>
      <div className="flex items-center justify-end">
        <Loginbtn />
      </div>
    </div>
  );
};
