import Posts from "./components/posts/posts";
import { getUserId } from "@/lib/getUserId";
import { getTopUsers } from "@/lib/getTopUsers";
import { getTopSubs } from "@/lib/getTopSubs";
import Filter from "./components/posts/filter";
import Top from "./components/top";
import About from "./components/about";

export default async function Home() {
  const user = await getUserId();
  const topUsers = await getTopUsers();
  const topSubs = await getTopSubs();

  return (
    <div className="w-full lg:grid lg:grid-cols-[650px_auto] gap-2 lg:gap-4">
      <div className="space-y-2">
        <Filter />
        <Posts user={JSON.parse(JSON.stringify(user))} />
      </div>
      <div className="space-y-2">
        <About />
        <Top
          topUsers={JSON.parse(JSON.stringify(topUsers))}
          topSubs={JSON.parse(JSON.stringify(topSubs))}
        />
      </div>
    </div>
  );
}
