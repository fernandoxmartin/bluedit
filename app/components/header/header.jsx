import Link from "next/link";
import Login from "./login";
import User from "./user";
import Hamburger from "./hamburger";
import Nav from "../mobile/nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-14 w-full bg-light px-8 grid grid-cols-2 lg:grid-cols-3 dark:bg-dark">
      <div className="flex items-center">
        <Link href="/" className="text-primary text-md font-bold">
          Bluedit
        </Link>
      </div>
      <div className="hidden lg:flex items-center">
        <input
          type="text"
          className="bg-light-bg w-full h-8 rounded text-center dark:bg-dark-bg dark:text-dark-text"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center justify-end">
        {!session?.user && <Login />}
        {session?.user && <User image={session.user?.image} />}
        <Hamburger />
      </div>
      <Nav session={session} />
    </div>
  );
}
