import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import CreateButton from "./createButton";

export default async function CreateCheck() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {!session?.user && <></>}
      {session?.user && <CreateButton />}
    </>
  );
}
