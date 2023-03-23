import Posts from "../../components/posts/posts";
import AboutSub from "./AboutSub";
import { prisma } from "@/lib/prismadb";
import { getUserId } from "@/lib/getUserId";

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
      <Posts
        posts={JSON.parse(JSON.stringify(sub.posts))}
        user={JSON.parse(JSON.stringify(user))}
      />
      <AboutSub
        sub={JSON.parse(JSON.stringify(sub))}
        user={JSON.parse(JSON.stringify(user))}
      />
    </>
  );
}
