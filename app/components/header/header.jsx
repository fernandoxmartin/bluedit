import Link from "next/link";
import Image from "next/image";
import Login from "./login";
import Hamburger from "./hamburger";
import Nav from "../mobile/nav";
import DropDownNav from "./dropdownNav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Logo from "@/public/Bluedit.png";
import LogoDark from "@/public/Bluedit-dark.png";
import Search from "./search";
import User from "./user";
import Create from "./create";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-16 w-full bg-light px-6 flex items-center justify-between  dark:bg-dark">
      <div className="flex items-center space-x-6">
        <Link href="/" className="w-24 flex items-center space-x-1">
          <div className="w-6 h-6  bg-primary rounded-full" />
          <Image
            src={Logo}
            width={65}
            height={65}
            alt={"logo"}
            priority
            className="block dark:hidden"
          />
          <Image
            src={LogoDark}
            width={65}
            height={65}
            alt={"logo"}
            priority
            className="hidden dark:block"
          />
        </Link>
        <DropDownNav />
      </div>

      <div className="hidden lg:flex w-full items-center mx-4">
        <Search />
      </div>

      <div className="flex items-center justify-end">
        <Create />
        {!session?.user && <Login />}
        {session?.user && <User user={session?.user?.name} />}
        <Hamburger />
      </div>
      <Nav />
    </div>
  );
}
