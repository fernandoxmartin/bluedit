import { useSession, signIn, signOut } from "next-auth/react";

export const Logoutbtn = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <h1>Hello, {session.user.name}</h1>
        <button
          className="px-4 py-2 rounded bg-light-primary text-light"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </>
    );
  }
  return <div></div>;
};
