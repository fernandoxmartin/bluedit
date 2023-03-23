import { ImPlus } from "react-icons/im";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function CreateButton() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {!session?.user && <></>}
      {session?.user && (
        <Link href="/new">
          <button className="w-14 h-14 rounded bg-primary text-light flex items-center justify-center fixed bottom-5 right-5">
            <ImPlus className="text-xl" />
          </button>
        </Link>
      )}
    </>
  );
}
