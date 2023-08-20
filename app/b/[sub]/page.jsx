import Posts from "../../components/posts/posts";
import AboutSub from "./aboutSub";
import { prisma } from "@/lib/prismadb";
import { getUserId } from "@/lib/getUserId";
import Filter from "@/app/components/posts/filter";

export default async function Sub({ params }) {
  const sub = await prisma.sub.findUnique({
    where: { slug: params.sub },
    include: {
      posts: { include: { post_votes: true, user: true, sub: true } },
      members: true,
    },
  });

  const user = await getUserId();

  return (
    <>
      <div className="w-full grid lg:grid-cols-[650px_auto] gap-2 lg:gap-4">
        <div className="space-y-2">
          <Filter />
          <Posts user={JSON.parse(JSON.stringify(user))} />
        </div>
        <div className="space-y-2 row-start-1 lg:row-auto">
          <AboutSub
            sub={JSON.parse(JSON.stringify(sub))}
            user={JSON.parse(JSON.stringify(user))}
          />
        </div>
      </div>
    </>
  );
}
