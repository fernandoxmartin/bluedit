import Results from "./results";
import { getUserId } from "@/lib/getUserId";

export default async function Search({ searchParams }) {
  const user = await getUserId();

  return (
    <div className="w-full grid lg:grid-cols-[650px_auto] gap-2 lg:gap-4">
      <p className="text-sm p-4 col-span-2">
        Search results for `{searchParams.q}`
      </p>
      <Results user={JSON.parse(JSON.stringify(user))} />
    </div>
  );
}
