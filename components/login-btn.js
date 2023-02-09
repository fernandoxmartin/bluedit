import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export const Loginbtn = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="hidden lg:block">
        <Image
          height={30}
          width={30}
          src={session.user.image}
          alt="user image"
          className="rounded-full"
          priority
        />
      </div>
    );
  }
  return (
    <div>
      <button
        className="px-4 py-2 rounded-lg bg-light-primary text-light text-xs cursor-pointer"
        onClick={() => signIn()}
      >
        Log In
      </button>
    </div>
  );
};
