import { useSession, signOut } from "next-auth/react";

export const Logoutbtn = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button
          className="px-8 py-3 mt-4 rounded-lg bg-primary text-light border-2 border-light dark:bg-dark dark:border-primary"
          onClick={() => signOut()}
        >
          Log Out
        </button>
      </>
    );
  }
  return <div></div>;
};
