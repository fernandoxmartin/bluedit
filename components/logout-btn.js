import { useSession, signOut } from "next-auth/react";

export const Logoutbtn = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button
          className="px-8 py-3 mt-4 rounded-lg bg-light-primary text-light border-2 border-light"
          onClick={() => signOut()}
        >
          Log Out
        </button>
      </>
    );
  }
  return <div></div>;
};
