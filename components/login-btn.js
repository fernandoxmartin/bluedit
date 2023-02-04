import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export const Loginbtn = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Image
          height={40}
          width={40}
          src={session.user.image}
          alt="user image"
          className="rounded-full"
          priority
        />
      </>
    );
  }
  return (
    <div>
      <button
        className="px-4 py-2 rounded bg-light-primary text-light cursor-pointer"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </div>
  );
};
